const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGODB_URI

mongoose.set('strictQuery', false);
mongoose.connect(
    mongoURI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected Successfully");
});

module.exports = {
    mongoose,
    db
}