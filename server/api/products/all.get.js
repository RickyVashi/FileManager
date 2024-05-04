import db from '../../../db.json'

export default defineEventHandler((event)=>{
   return sendRedirect(event,'/api/products')
})