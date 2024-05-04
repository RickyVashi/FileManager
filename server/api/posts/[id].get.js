import db from '../../../db.json'

export default defineEventHandler((event)=>{
   const postid= event.context.params.id
   const post = db.posts.find(post=> post.id == postid)

   return post
})