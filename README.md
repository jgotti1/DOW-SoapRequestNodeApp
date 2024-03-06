# SOAP Request Forwarder (John Margotti)

This Node.js application acts as a middleware that facilitates the forwarding of SOAP requests and responses between a client application, like Postman. It is designed to accept a SOAP request in the form of an XML body from the client, forward it to a specified SOAP service, and then return the SOAP response back to the client as xml.

## Features

- **Receive SOAP Requests**: Accepts XML-based SOAP requests via HTTP from client applications.
- **Forward Requests**: Forwards the received SOAP requests to a pre-configured SOAP service endpoint.
- **Return SOAP Responses**: Retrieves SOAP responses from the SOAP service and relays them back to the requesting client.

## How It Works

1. **Accept Request**: The application listens for incoming SOAP requests on the `/soaprequest` route. It expects the request body to contain a raw XML.

2. **Forward SOAP Request**: Upon receiving a SOAP request, the application forwards the XML request to a specified SOAP service URL. The forwarding process includes setting  HTTP headers as needed.

3. **Return Response**: The SOAP service processes the forwarded request and sends back a SOAP response. This XML response is then relayed back to the client by the middleware application.

## Setup and Usage

### Running the Application

1. Start the application by running `node server.js`
2. The application will start listening for requests on the configured port (default: 5000).

### Sending a SOAP Request

1. Open Postman or a similar  client.
2. Create a new request with the following settings:
   - **Method**: GET
   - **URL**: `http://localhost:5000/soaprequest` (adjust the port as necessary)
   - **Headers in Client**: 
      Set `Content-Length` to "blank" or <calculated when request is sent> 
      Set `Content-Type` to `text/xml` 
      Set `Host` to "blank" (Empty)
      
   - **Body**: Choose 'raw' and input your SOAP XML request.
3. Send the request, and the node application will forward it to the SOAP service and return the response back to you.

## Configuration

To change the SOAP service endpoint or other configurations, edit the corresponding variables in the application code.

- `url`: The URL of the SOAP service to which requests are forwarded.
- `soapHeaders`: HTTP headers used when forwarding the SOAP request. Adjust as needed.


