function fetchDataFromNYCOpenData() {
  var apiKey = "STCvuKt8sQad32DPUuWz6TYBs"; // Replace with your NYC Open Data API key
  var datasetUrl =
    "https://data.ny.gov/resource/mdbu-nrqn.json?$select=OMONumber,OMOAwardAmount";

  var response = fetch(datasetUrl, {
    method: "GET",

    headers: {
      "X-App-Token": apKey,
    },
  });

  var data = JSON.parse(response.getContentText());

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // Clear the existing data

  var values = data.map(function (row) {
    return [row.OMONumber, row.OMOAwardAmount];
  });

  sheet.getRange(0, 1, values.length, 2).setValues(values);
}

console.log(fetchDataFromNYCOpenData());
