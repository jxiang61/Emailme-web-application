const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   googleId: String,
   credits: {
      type: Number,
      default: 10
   }
});

//1st param: name of this collection
mongoose.model('users', userSchema);

