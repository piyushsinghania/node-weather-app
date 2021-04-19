const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

//! Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//! Setup handlebar engines and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//! Setup satic directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Piyush Singhania",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Piyush Singhania",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Piyush Singhania",
    message: "Welcome to the help page",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help Article not found",
    title: "404 Page",
    name: "Piyush Singhania",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a location",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: forecast,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404 Page",
    name: "Piyush Singhania",
  });
});
//!Strating up the web server at localhost:3000
app.listen(port, () => {
  console.log("Server started in port " + port);
});
