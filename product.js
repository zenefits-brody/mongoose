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

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 1986 });
bike
  .save()
  .then((data) => {
    console.log('Save success!');
    console.log(data);
  })
  .catch((error) => {
    console.log('Save failed!');
    console.log(error);
  });
