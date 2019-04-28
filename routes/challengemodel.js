var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect("mongodb+srv://admin:123@cluster0-mozuc.mongodb.net/test?retryWrites=true", {dbName: 'mongoose'});
var newSchema = new Schema({
    index:[Number],
    name:[String],
    date: [String],
    start: [String],
    end:[String]
});
module.exports=mongoose.model("challenges",newSchema);