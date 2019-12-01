require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

mongoose.set("useCreateIndex", true);

if (process.env.NODE_ENV === "test") {
  process.env.MONGODB_CONNECTION = `mongodb://localhost/gamestation-test`;
}

mongoose.set("useFindAndModify", false);

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("succesfully connect to database");
  } catch (e) {
    console.error(err.message);
    process.exit(1);
  }
})();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

module.exports = app;
