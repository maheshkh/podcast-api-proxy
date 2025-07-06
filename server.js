// File: server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }
  try {
    console.log('targetUrl' + targetUrl)
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' }
    });
    if (!response.ok) {
      return res.status(response.status).send(await response.text());
    }
    const data = await response.text();
    res.header("Content-Type", response.headers.get("Content-Type"));
    res.send(data);
  } catch (error) {
    console.log(error)
    res.status(500).send("Proxy server error.");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
