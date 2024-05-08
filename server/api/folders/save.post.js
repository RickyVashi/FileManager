// Assuming your Post model file is located at "~/server/models/Post.js"
import FolderModel from "../../models/Folder";

export default defineEventHandler(async (event) => {

    try{
    
            const body = await readBody(event);
        
            // if (body) {
            //     const folderData = await FolderModel.find({'name': body.name, 'parent': body.parent});
                
            // } else {
            //     console.log("Body is empty or undefined");
            // }
 
            const folderData = new FolderModel(body);
        
        await folderData.save();

        //Return success message and the saved data
        return {
            "message": "success",
            "data":folderData
        }; 
       
    } catch (error) {
        console.log("Error",error);
    }
});
