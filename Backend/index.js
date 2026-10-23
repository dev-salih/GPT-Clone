const express = require("express");

const app = express();

// req -> middleware -> res

function logger(req, res, next) {
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  res.send("from logger middleware");
}

app.get("/",logger, (req, res) => {
  res.send("Hello, World!");
});

app.get("/about",logger, (req, res) => {
  res.send("Hello, World!, from about route");
});

app.get("/api/chat", (req, res) => {
  res.send("Hello, World!, from chat route");
});

app.get("/api/conversation", (req, res) => {
  res.send("Hello, World!, from conversation route");
});


app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});