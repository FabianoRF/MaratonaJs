const express = require('express')
const bcrypt=require('bcrypt')
const { Account } =require('../models')
const {accountSignUp}=require('../validators/account')
const {getMessage}=require('../helpers/messages')

const router = express.Router()

const saltRounds=10; 

//rota para autenticacao
router.get('/sign-in', (req, res)=>{
    return res.jsonOK(null)
})

//rota para cadastro
router.get('/sign-up', accountSignUp, async (req, res)=>{
    const { email, password } = req.body
    

    const account = await Account.findOne({ where: {email} })
    if(account) return res.jsonBadRequest(getMessage('account.SignUp.email_exists'))//caso já exista

    const hash = bcrypt.hashSync(password, saltRounds)
    const newAccount = await Account.create({email, password: hash})

    
    return res.jsonOK(newAccount, getMessage('account.SignUp.success'));

})

module.exports=router