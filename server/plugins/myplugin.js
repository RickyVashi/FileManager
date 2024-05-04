import mongoose from "mongoose";

export default async()=>{
    const config = useRuntimeConfig()

    try{
        const DB_OPTIONS = {
            dbName: config.dbName
        }
        await mongoose.connect(config.dburl,DB_OPTIONS)
        console.log("Connected Successfully")
    }catch(error){
        console.log(error);
    }
   
}