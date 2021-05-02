const mongoose = require('./db.js');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    age:Number,
    gender:String,
    address:String
},
{ collection: 'user' });


let User = mongoose.model('user', userSchema);

module.exports = User;