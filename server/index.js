const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");

const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log("MongoDB Connection error: ",err));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/predict', require('./routes/predict'));
app.use('/api/engines', require('./routes/engines'));
app.use('/api/sites', require('./routes/sites'));
app.use('/api/parts', require('./routes/parts'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/positions', require('./routes/positions'));
app.use('/api/experts', require('./routes/experts'));
app.use('/api/manuals', require('./routes/manuals'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port1 = process.env.PORT || 13004

app.listen(port1, () => {
  console.log(`Server Listening on ${port1}`)
});
