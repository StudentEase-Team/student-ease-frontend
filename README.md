# StudentEase Frontend App

![logolight](https://github.com/user-attachments/assets/f4bfc2fd-1f61-4e7c-a5bc-f1a26de255c0)


**Note:** This app is a React Native Expo application designed to work as a frontend for the StudentEase backend server.

StudentEase Frontend App is built using React Native and Expo, providing a seamless mobile experience for students. The app connects to the backend server to fetch and display data, manage user authentication, and provide various features relevant to students.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Features

- **Cross-Platform Compatibility:** The app runs on both iOS and Android devices.
- **API Integration:** Connects to the StudentEase backend server to fetch data and handle user interactions.
- **User Authentication:** Supports user login with secure token management.
- **Campus map:** Features an interactive 3D map of the UNS campus (currently)
- **Unifies subjects:** Every subject and materials for it in one place.
- **Email alerts:** Send emails.
- **Dark theme support**

## Prerequisites

- **Node.js** and **npm** should be installed on your system.
- **Expo CLI** should be installed globally.
- **VS Code** or another IDE for developing JavaScript applications.
- **Android Studio** or **Xcode** for running the application on an emulator or physical device.

## Installation

To install and set up the application locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/StudentEase-Team/student-ease-frontend-app.git
    ```

2. **Install dependencies:**

    - While in the `student-ease-frontend-app` directory, run:

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    - Add a `.env` file in the root directory of the application with the following content:

    ```plaintext
    API_BASE_URL=http://local-ip-here:8080/api
    ```

4. **Add the base URL to `eas.json`:**

    - Make sure your `eas.json` file includes the `API_BASE_URL` configuration as shown below:

    ```json
    {
      "cli": {
        "version": ">= 10.2.2"
      },
      "build": {
        "development": {
          "developmentClient": true,
          "distribution": "internal",
          "env": {
            "API_BASE_URL": "http://local-ip-here:8080/api"
          }
        },
        "preview": {
          "distribution": "internal"
        },
        "production": {
          "env": {
            "API_BASE_URL": "http:///local-ip-here:8080/api"
          }
        }
      },
      "submit": {
        "production": {}
      }
    }
    ```

5. **Start the application:**

    - Run the app on an Android device or emulator with the following command:

    ```bash
    npx expo run:android
    ```

## Usage

Once the app is running, it will connect to the backend server using the base URL specified in the `.env` file. The app will fetch data, manage user authentication, and handle other student-related functionalities.

## Configuration

- **API Base URL:** Ensure that the `API_BASE_URL` in the `.env` file and `eas.json` file is set correctly to match the backend server's address.
- **Development Environment:** You can modify the `eas.json` file to suit different environments such as development, preview, and production.

