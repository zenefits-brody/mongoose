const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection success!');
  })
  .catch((error) => {
    console.log('Connection failed!');
    console.log(error);
  });
