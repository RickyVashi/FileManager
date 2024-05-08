import mongoose from 'mongoose'

const folderSchema = new mongoose.Schema({
    'name':{type:String, required:true , trim:true},
    'parent': {type:String,required:false,trim:true},
    'type':{type:String,required:true}
})


const FolderModel = mongoose.model('folder',folderSchema)

export default FolderModel