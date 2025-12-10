const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./src/routes/user.route.js");
const doctorRoute = require("./src/routes/doctor.route.js");
const patientRoute = require("./src/routes/patient.route.js");
const clinicRoute = require("./src/routes/clinic.routes.js");
const roleRoute = require("./src/routes/role.route.js");
const clinicDoctorRoute = require("./src/routes/clinicDoctor.route.js");
const slotRoute = require("./src/routes/slot.route.js");
const appointmentRoute = require("./src/routes/appointment.route.js");
const authRoute = require("./src/routes/auth.route.js");

dotenv.config();
const app = express();
app.use(express.json());


app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/roles", roleRoute);

app.use("/api/doctors", doctorRoute);

app.use("/api/patients", patientRoute);

app.use("/api/clinics", clinicRoute);

app.use("/api/clinic-doctors", clinicDoctorRoute);

app.use("/api/slots", slotRoute);

app.use("/api/appointments", appointmentRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(` App is running on port ${port}`);
});