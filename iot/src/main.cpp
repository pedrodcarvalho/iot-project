#include <Arduino.h>
#include <WiFi.h>
#include <cstdlib>
#include <WebSocketsClient.h>

const char *ssid = std::getenv("SSID");
const char *password = std::getenv("PASSWORD");
const char *ipAddress = std::getenv("IP_ADDRESS");
const uint16_t wsPort = 8080;

WebSocketsClient webSocket;

unsigned long lastTransmissionTime = 0;
const unsigned long TRANSMIT_DELAY = 10000;

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

    unsigned long currentTransmissionTime = millis();

    if (currentTransmissionTime - lastTransmissionTime >= TRANSMIT_DELAY) {
        webSocket.sendTXT("Hello, world!");

        lastTransmissionTime = currentTransmissionTime;
    }
}
