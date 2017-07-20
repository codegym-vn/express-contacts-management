/**
 * Created by nhatnk on 7/20/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    name: String,
    phone: String,
    email: String,
    created_at: Schema.Types.Date
});

module.exports = mongoose.model('Contact', Contact);