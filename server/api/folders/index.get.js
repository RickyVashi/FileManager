import FolderModel from "~/server/models/Folder";

export default defineEventHandler(async()=>{
    try{
        const result= await FolderModel.find({parent : ""})
        return result
    } catch(error){
        console.log(err)
    }
})