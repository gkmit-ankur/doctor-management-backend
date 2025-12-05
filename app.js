const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./src/routes/user.route.js");
const doctorRoute = require("./src/routes/doctor.route.js");
const patientRoute = require("./src/routes/patient.route.js");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/patients", patientRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(` App is running on port ${port}`);
});