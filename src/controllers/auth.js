const express = require('express')
const bcrypt=require('bcrypt')
const { Account } =require('../models')
const { accountSignUp, accountSignIn }=require('../validators/account')
const { getMessage }=require('../helpers/messages')
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, verifyJwt, getTokenFromHeaders }=require('../helpers/jwt')


const router = express.Router()

const saltRounds=10; 

//rota para autenticacao
router.post('/sign-in', accountSignIn, async (req, res)=>{

    const { email, password } = req.body

    const account = await Account.findOne({ where: {email} })
    
    //validar a senha
    const match = account ? bcrypt.compareSync(password, account.password) : null//compara e ve se as mesma batem
    if(!match) return res.jsonBadRequest(getMessage('account.SignIn.invalid'))//caso já exista

    //token que serão passados como metadados
    const token = generateJwt({id: account.id})
    const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion})

    return res.jsonOK(account, null, {token, refreshToken})
})

//rota para cadastro
router.post('/sign-up', accountSignUp, async (req, res)=>{
    const { email, password } = req.body
    

    const account = await Account.findOne({ where: {email} })
    if(account) return res.jsonBadRequest(getMessage('account.SignUp.email_exists'))//caso já exista

    //criar senha
    const hash = bcrypt.hashSync(password, saltRounds)
    const newAccount = await Account.create({email, password: hash})

    //token que serão passados como metadados
    const token = generateJwt({id: newAccount.id})
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion})

    
    return res.jsonOK(newAccount, null, {token, refreshToken});

})

//rota para refresh token
router.post('/refresh', async (req,res)=>{
    
    const token = getTokenFromHeaders(req.headers)

    console.log(token)

    if(!token){
        return res.jsonUnauthorized(null, 'Invalid Token')
    }

    try{
        const decoded = verifyRefreshJwt(token)
        const account = await Account.findByPk(decoded.id)

        console.log('valor do decoded ', decoded)

        if(!account) return res.jsonUnauthorized(null, 'Invalid Token')

        if(decoded.version !== account.jwtVersion) return res.jsonUnauthorized(null, 'Invalid token')

        const meta ={
            token : generateJwt({id: account.id})
        }

        return res.jsonOK(null, null, meta)

    }catch(error){

    }
})
module.exports=router