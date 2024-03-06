const express = require("express");
const app = express();
const soapRequest = require("easy-soap-request");
const fs = require("fs");

const port = 5000;

app.use(express.raw({ type: "text/xml", limit: "1mb" }));

//  Soap request XML URL
const url = "http://advertising.dowjones.net/DJ_Interfaces/DJ_Interfaces.asmx";
const soapHeaders = {
  "Content-Type": "text/xml;charset=UTF-8",
};

// Function to send SOAP request and get response
async function getSoapResponse(xml) {
  const { response } = await soapRequest({ url: url, headers: soapHeaders, xml: xml, timeout: 5000 });
  const { body } = response;
  return body;
}

// Endpoint to receive XML from Postman, forward it as a SOAP request, and return the SOAP response
app.get('/soaprequest', async (req, res) => {
  const xml = req.body.toString();
  try {
    // wait for the SOAP response
    const soapResponse = await getSoapResponse(xml);

    // Send the SOAP response back 
    res.setHeader("Content-Type", "text/xml;charset=UTF-8");
    res.send(soapResponse);
  } catch (error) {
    console.error('Error processing SOAP request:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
