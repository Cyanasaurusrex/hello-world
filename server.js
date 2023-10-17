const express = require('express');
const https = require('https')
const path = require('path')
const app = express();
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3000;
dotenv.config()
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
})

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.message);
  } else {
    console.log('Connected to the database');
  }
});




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

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM card ORDER BY oracle_id  LIMIT 10000', (err, results) => {
    if (err) {
      console.error('Database query error: ' + err.message);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});