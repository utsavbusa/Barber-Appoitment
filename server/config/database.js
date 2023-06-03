const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

exports.connect = () => {
  var connectionString = process.env.MONGO_LOCALHOST_URL;

  mongoose
    .connect(connectionString)
    .then(() => {
      if (connectionString.includes("localhost")) {
        console.log(
          "\x1b[32m\b%s\x1b[36m\x1b[1m%s\x1b[0m\n",
          "Database has been connected to ",
          "LocalHost"
        );
      } else {
        console.log(
          "\x1b[32m\b%s\x1b[36m\x1b[1m%s\x1b[0m\n",
          "Database has been connected to ",
          "ATLAS"
        );
      }
    })
    .catch((error) => {
      console.log("\x1b[41m", "database connection faild.", "\x1b[0m" + "\n");
      console.log(error);
      process.exit(1);
    });
};
