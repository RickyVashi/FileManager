import FolderModel from "../../models/Folder";

export default defineEventHandler(async (event)=>{
   

   try{
      
      const result= await FolderModel.find({'parent':event.context.params.id})
      return result
  
   } catch(error){
      console.log("Error is Backend");
  
  }

})