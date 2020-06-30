const express = require('express')
const router = express.Router()

//rota para autenticacao
router.get('/sign-in', (req, res)=>{
    return res.json('Sign-in')
})

//rota para cadastro
router.get('/sign-up', (req, res)=>{
    return res.json('Sign-up')
})

module.exports=router