import db from '../../../db.json'

import {createRouter, defineEventHandler,useBase} from 'h3'

const router = createRouter()

router.get('/all',defineEventHandler(()=>{
    db.users
}))

export default useBase('/api/users',router.handler)