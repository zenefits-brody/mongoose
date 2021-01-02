const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection success!');
  })
  .catch((error) => {
    console.log('Connection failed!');
    console.log(error);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.pre('save', async function () {
  console.log('About to save!');
});

personSchema.post('save', async function () {
  console.log('Just saved!');
});

const Person = mongoose.model('Person', personSchema);
