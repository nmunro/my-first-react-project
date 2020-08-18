const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
    code:  String, // String is shorthand for {type: String}
    date: { type: Date, default: Date.now },
});

module.exports = CodeSchema;
