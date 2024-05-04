// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    KEY : "hello-i-am-a-key-1234",
    dburl:process.env.DATABASE_URL,
    dbName: process.env.DBNAME
  }
})
