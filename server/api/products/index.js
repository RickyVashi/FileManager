import db from '../../../db.json'

export default defineEventHandler((event)=>{
    if(event.node.req.method === "POST"){
        return{
            "message":"Post Request Success"
        }
    }
    return db.products
})