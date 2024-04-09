#include <Arduino.h>
#include <WiFi.h>
#include <cstdlib>
#include <WebSocketsClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5
#define RST_PIN 0

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key;

const char *ssid = "Prime";
const char *password = "Carnaval21&";
const char *ipAddress = "192.168.15.143";
const uint16_t wsPort = 8080;

WebSocketsClient webSocket;

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
    switch (type) {
        case WStype_CONNECTED:
            Serial.println("Connected to WebSocket server");
            break;
        case WStype_TEXT:
            Serial.printf("Received message: %s\n", payload);
            break;
        case WStype_DISCONNECTED:
            Serial.println("Disconnected from WebSocket server");
            break;
        case WStype_ERROR:
            Serial.println("Error from WebSocket server");
            break;
    }
}

void setup()
{
    Serial.begin(115200);

    SPI.begin();
    rfid.PCD_Init();

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
    }

    webSocket.begin(ipAddress, wsPort, "/");
    webSocket.onEvent(webSocketEvent);
}

void loop()
{
    webSocket.loop();

    if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
        return;
    }
    else {
        MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);

        if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI && piccType != MFRC522::PICC_TYPE_MIFARE_1K && piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
            Serial.println(F("Invalid card or tag type!"));
            return;
        }

        webSocket.sendBIN(rfid.uid.uidByte, rfid.uid.size);

        rfid.PICC_HaltA();
        rfid.PCD_StopCrypto1();
    }
}
