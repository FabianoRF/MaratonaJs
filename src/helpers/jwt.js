require('dotenv').config()//garante que tenha lido o arquivo
const jwt = require('jsonwebtoken')

const tokenPrivateKey= process.env.JWT_TOKEN_PRIVATE_KEY
const refreshTokenPrivateKey= process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY

const options ={expiresIn: '30 minutes'}//tempo de expiração
const refreshOptions ={expiresIn: '30 days'}//tempo de expiração

const generateJwt = (payload) =>{
    return jwt.sign(payload, tokenPrivateKey, options)
}

const generateRefreshJwt = (payload) =>{
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions)
}

const verifyJwt=(token) => {
    return jwt.verify(token, tokenPrivateKey);
}

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey);
}

//tira o Bearer
const getTokenFromHeaders = (headers) => {
    let token = headers['authorization']
    
    return token= token ? token.slice(7, token.length) : null
}

module.exports={generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeaders}