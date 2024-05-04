import { parse } from "postcss"


export default defineEventHandler((event)=>{

    //Accessing Config enviornmanet
    const config = useRuntimeConfig()
    console.log("Config :- ",config)

    //Accessing Cookies
    const cookie = parseCookies(event)
    console.log("Cookies:",cookie)
    
    return "This is not Correct Path"
})