const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://articledb:articledb07@articledb.72v2o.mongodb.net/?retryWrites=true&w=majority&appName=articledb");

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref:"post"}]
})

module.exports = mongoose.model('user', userSchema);