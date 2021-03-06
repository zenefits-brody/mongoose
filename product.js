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
  name: { type: String, required: true, maxlength: 20 },
  price: { type: Number, required: true, min: [0, 'Price must be positive.'] },
  onSale: { type: Boolean, default: false },
  categories: [String],
  quantity: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL'],
  },
});

// Add an instance method.
// Not using arrow function so that `this` will be the instance.
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

// Add a static method.
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true });
};

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 999, categories: ['cycling', 'sports'] });

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

// Need to explicitly set runValidators!
Product.findOneAndUpdate({ name: 'Mountain Bike' }, { price: 899 }, { new: true, runValidators: true })
  .save()
  .then((data) => {
    console.log('Success!');
    console.log(data);
  })
  .catch((error) => {
    console.log('Failed!');
    console.log(error);
  });
