import db from '../../../db.json'

// export default defineEventHandler((event)=>{
//    const postid= event.context.params.id
//    const post = db.products.find(product=> product.id == postid)

//    return post || {"messsage" : "product not found"}   
// })



//throwing exception

export default defineEventHandler((event)=>{
   const postid= parseInt(event.context.params.id)
   if(!Number.isInteger(postid)){
      throw createError({
         statusMessage : "ID should be Integer",
         statusCode : "400"
      })
   }
   const post = db.products.find(product=> product.id == postid)

   return post || {"messsage" : "product not found"}   
})