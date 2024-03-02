const express = require('express');
const cors = require("cors");
require("dotenv").config();

const bodyParser = require('body-parser');

const app = express();

// var corsOption = {
//   origin: "http://localhost:8081", // Ubah origin menjadi http://localhost:8081
//   credentials: true
// };

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./src/models");
const Role = db.role;

db.sequelize.sync()
  .then(() => {
    console.log("synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// routes

//simple route
app.get("/", (req, res) => {
  res.json({ message: "server running succesfully!" });
});

// routes
require('./src/routes/auth_routes')(app);
require('./src/routes/user_routes')(app);
require('./src/routes/drugs_routes')(app);
require('./src/routes/category_routes')(app);
require('./src/routes/medicalDevice_routes')(app);

// Listen to port 8080
const server = app.listen(8080, () => console.log(`server running at port 8080`));

process.on('SIGTERM', () => {
  console.info('SIGTERM signal recived.');
  console.log('Closing http server');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});

// initial role

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "doctor"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// Uncomment the below line if you want to drop and re-sync the database on every restart
// db.sequelize.sync({ force: true }).then(() => { console.log('Drop and Resync DB'); initial(); });
