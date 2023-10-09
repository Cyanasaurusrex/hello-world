const express = require('express');
const https = require('https')
const path = require('path')
const app = express();
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3000;
dotenv.config()

app.get('/api', (req, res) => {
  const apiKey = process.env.API_KEY
  const apiURL =
    `https://api.openweathermap.org/data/2.5/weather?q=Columbus&appid=${apiKey}&units=imperial`;
  console.log(apiKey)
  const request = https.get(apiURL, (apiResponse) => {
    let data = "";

    apiResponse.on("data", (chunk) => {
      data += chunk;
    });

    apiResponse.on("end", () => {
      try {
        const externalData = JSON.parse(data);

        res.json(externalData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).json({ error: "Internal Server Erorr" });
      }
    });
  });

  request.on("error", (error) => {
    console.error("Error making HTTP request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  });

  request.end()
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});