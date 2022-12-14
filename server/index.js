const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const userRoute = require("./routes/user");
const authRoute = require("./routes/authentification");
const stripeRoute = require("./routes/stripe");
const medicineRoute = require("./routes/medicines");
const drugstoreRoute = require("./routes/drugstores");
const pacientsRoute = require("./routes/pacients");



dotenv.config();
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());

// #FOR logging requests
app.use(morgan('combined'));

mongoose.connect(
  process.env.MONGO_URL
).then(() => console.log("Connected to the database")
).catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/medicines", medicineRoute);
app.use("/api/drugstores", drugstoreRoute);
app.use("/api/pacients", pacientsRoute);

app.use("/api/authentication", authRoute);
app.use("/api/stripe", stripeRoute);

app.listen(PORT, () => {
  console.log(`Console running on port ${PORT}`);
})