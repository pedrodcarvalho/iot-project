# IoT Attendance Control System

## Overview

This project is an IoT-based attendance control system that utilizes RFID technology to track and manage worker attendance. It consists of three main components:

1. ESP: Microcontroller device equipped with an RFID reader to scan worker RFID tags.
2. Server: Node.js server built with Express framework to receive RFID data from ESP and manage attendance records.
3. Client: React.js web application providing a user interface for monitoring and controlling attendance.

## Components

### ESP32

- Firmware: Arduino-based code for reading RFID tags and sending data to the server.
- Hardware: ESP32-WROOM-32 microcontroller, RFID reader module, wiring diagram.

### Server (Node.js + Express)

- Server: Node.js backend (`server.js`) built with Express framework to handle HTTP requests.
- Database: MongoDB for storing attendance records.
- Routes: API routes for receiving RFID data and managing attendance records.
- Middleware: CORS, body-parser for handling HTTP requests.

### Client (React Web App)

- Frontend: React application (`client` directory) for providing a user interface.
- Components: UI components for displaying attendance data, managing workers, and controlling attendance.
- State Management: Redux for state management.
- Communication: Axios for HTTP requests to the server.

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/pedrodcarvalho/iot-project.git
   ```
2. Set up ESP:
   - Flash `/iot/src/main.cpp` to your ESP32 device.
   - Update WiFi credentials and server IP address in the firmware.
3. Set up Server:
   - Navigate to the `server` directory.
   - Install dependencies: `npm install`.
   - Configure MongoDB connection in `config.js`.
   - Start the server: `npm start`.
4. Set up Client:
   - Navigate to the `client` directory.
   - Install dependencies: `npm install`.
   - Update server URL in API requests (if necessary).
   - Start the client: `npm start`.

## Usage

1. Power up the ESP and ensure it's connected to the network.
2. Access the client application through a web browser.
3. Use the provided interface to manage workers and monitor attendance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
