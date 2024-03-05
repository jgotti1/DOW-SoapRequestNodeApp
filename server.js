const express = require("express");
const app = express();
const soapRequest = require("easy-soap-request");
const fs = require("fs");

const port = 5000;

//  Soap request XML file request URL
const url = "http://advertising.dowjones.net/DJ_Interfaces/DJ_Interfaces.asmx";
const soapHeaders = {
  "Content-Type": "text/xml;charset=UTF-8",
};

// import response XML file and replce the placeholder wit hthe advertising number
function replaceNumberInXML(number) {
  // Read the XML file
  const xmlTemplate = fs.readFileSync("Requests/in/request.xml", "utf-8");

  // Replace 'number-variable' with the provided number
  const xml = xmlTemplate.replace("number-variable", number);

  return xml;
}

// Function to generate a date time string to append on my response file
function getFormattedDateTime() {
  const now = new Date();
  console.log(now);
  return now.toISOString().replace(/[-:.]/g, "").slice(0, 15); // YYYYMMDDTHHMMSS format
}

// send request and get response
async function getSoapRequest(xml) {
  const { response } = await soapRequest({ url: url, headers: soapHeaders, xml: xml, timeout: 5000 });
  const { headers, body, statusCode } = response;
  console.log({ response });
  console.log(headers);
  console.log(body);
  console.log(statusCode);
  // Write response to file with current date-time appended to filename
  const dateTime = getFormattedDateTime();
  const responseFilePath = `Requests/out/response_${dateTime}.xml`;
  fs.writeFileSync(responseFilePath, body, "utf-8");
  console.log(`XML Soap response file (${responseFilePath}) was successfully written...`);
  return body;
}

app.get("/soapRequest/:number", async (req, res) => {
  const number = req.params.number; // Assign the captured number to a variable

  // Generate the XML with the number replaced
  const xml = replaceNumberInXML(number);
  console.log(xml);

  // Pass the generated XML with lookup number to getSoapRequest and wait for response
  const response = await getSoapRequest(xml);


  const fullResponse = `${response}<!-- ============================================== --><!-- SOAP request completed with number: ${number} -->`;

  res.setHeader("Content-Type", "text/xml");
  res.send(fullResponse);
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
