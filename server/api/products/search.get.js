
import db from '../../../db.json'

export default defineEventHandler((event)=>{
    const query = getQuery(event)
    const productid= query.id

    const product = db.products.find(product=> product.id == productid)

    //Returning other status code
    setResponseStatus(event,202)
    return product
})