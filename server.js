const soapRequest = require("easy-soap-request");
const fs = require("fs");

//  data
const url = "http://advertising.dowjones.net/DJ_Interfaces/DJ_Interfaces.asmx";
const soapHeaders = {
  "Content-Type": "text/xml;charset=UTF-8"
};

// import response XML file 
const xml = fs.readFileSync("Requests/in/request.xml", "utf-8");

// Function to generate a date time string
function getFormattedDateTime() {
  const now = new Date();
  return now.toISOString().replace(/[-:.]/g, "").slice(0, 15); // YYYYMMDDTHHMMSS format
}

// send request and get response
(async () => {
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
  console.log("XML file was successfully written to Requests/out");
  // Exit the process
  process.exit(0);
})();
