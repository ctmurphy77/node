var mongoose = require('mongoose');
//create schema
var BlogSchema = mongoose.Schema({
    author: String,
    category: String,
    post: String,
    tags: [String],
    date: { type: Date, default: Date.now }
});
BlogSchema.methods.posted = function(){
    console.log(this.author + ' posted ' + this.post + ' about '
    + this.category + ' on ' + this.date);
}
// compile schema into model, used to create documents in the db
var Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog;
