// import mongoose package
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
// connect the database
mongoose.connect('mongodb+srv://team4:team4123456@cluster0-mozuc.mongodb.net/test?retryWrites=true', {dbName: 'mongoose'});
// set the schema for the form
var newSchema = new Schema({
    index:[Number],
    name:[String],
    date: [String],
    start: [String],
    end:[String]
});
// allow other modules to use such schema
module.exports=mongoose.model("challenges",newSchema);