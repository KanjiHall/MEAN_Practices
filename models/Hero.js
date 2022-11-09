const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/HeroDB');

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
    id: Number,
    name: String,
}, {
    collection: 'Heroes'
});

module.exports = mongoose.model("Hero", Schema)