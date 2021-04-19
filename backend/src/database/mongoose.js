require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`;
// console.log(uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to database!');
  }).catch((err) => {
    console.log('Connection failed');
    throw err;
});
