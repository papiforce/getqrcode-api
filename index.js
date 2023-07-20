require("dotenv").config();

const express = require("express");
const databaseConnection = require("./src/config/database");
const cors = require("cors");
const logger = require("./src/config/logger");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT;
const whiteList = [
  "https://scanverse.onrender.com",
  "https://scanverse.vercel.app/",
];

const corsOptions = {
  origin: function (origin, callback) {
    var options;
    if (!whiteList.indexOf(origin) !== -1) {
      options = { origin: true };
    } else {
      options = { origin: false };
    }
    callback(null, options);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

databaseConnection();

app.use(express.json({ limit: "50mb" }));

app.use(cors(corsOptions));

app.use("/api", routes);

app.use((err, req, res, next) => {
  logger.error(err.stack);

  res.status(err.statusCode || 500).send({ error: err.message });
});

app.listen(port, () => {
  logger.info(`Serveur disponible sur le port : ${port}`);
});
