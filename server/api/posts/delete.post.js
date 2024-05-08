

  // Assuming your Post model file is located at "~/server/models/Post.js"
import PostModel from "../../models/Post";

export default defineEventHandler(async (event) => {

    try{
        const body= await readBody(event)
        
        if(typeof(body) === 'string'){
            
            const getData = await PostModel.findByIdAndDelete(body);
            await useStorage().removeItem(`fs:${getData.image}`);

            return {
                "message": "Deleted Successfully",
                "data": getData
            }; 
        }
        else if(typeof(body) === 'object'){
            for(let i=0 ; i<body.length ; i++)
                {
                console.log(body[i]);
                const getData = await PostModel.findByIdAndDelete(body[i]);
                await useStorage().removeItem(`fs:${getData.image}`);

                 
            }
            return {
                "message": "Deleted Successfully",
            };

        }

        
       
    } catch (error) {
        console.log("Error",error);
    }
});