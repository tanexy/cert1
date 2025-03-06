// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
const getDateDetails = (dateString) => {
  let date;

  // If dateString is a valid Unix timestamp, create a Date object using it
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    // Otherwise, try to parse the date string as a standard date
    date = new Date(dateString);
  }

  // If the date is invalid, return null
  if (isNaN(date.getTime())) {
    return null;
  }

  const unixTimestamp = date.getTime(); // Unix timestamp in milliseconds
  const utcString = date.toUTCString(); // UTC string in format: "Fri, 25 Dec 2015 00:00:00 GMT"

  return { unix: unixTimestamp, utc: utcString };
};

// Route to handle the request
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  // If no date is provided, use the current date
  const dateDetails = getDateDetails(date || new Date().toISOString());

  if (!dateDetails) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // Return the JSON response with the Unix timestamp and UTC string
  res.json(dateDetails);
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
