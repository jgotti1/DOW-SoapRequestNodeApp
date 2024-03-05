# SOAP Request Express App

## Overview

This Express application performs an XML SOAP request using a number extracted from the URL path. The application listens for requests on the route `http://localhost:5000/soapRequest/:number`, where `:number` is a dynamic parameter that should be replaced with an actual number (e.g., `http://localhost:5000/soapRequest/205987064`).

After receiving a request, the application:

1. Replaces a placeholder in a predefined XML template with the number from the URL.
2. Sends the modified XML as a SOAP request to a predefined SOAP endpoint.
3. Writes the SOAP response to a time-stamped XML file in the `out` directory.
4. Returns the SOAP response XML back to the client's browser.

## Setup

To run this application, you need Node.js 
Run `npm install` to install the required dependencies.

## Running the Application

To start the application, run the following command in your terminal or command prompt from the root of the project directory: node server.js

