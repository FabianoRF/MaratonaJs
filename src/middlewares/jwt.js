const {verifyJwt}= require('../helpers/jwt')

const checkJwt = (req, res, next)=>{

    let token = req.headers['authorization']
    token= token ? token.slice(7, token.length) : null//tira o bearer

    if(!token){
        return res.jsonUnauthorized(null, 'Invalid token')
    }
    
    try{
        const decoded = verifyJwt(token)
        req.accountId = decoded.id
        
        console.log('decoded',decoded.id)
        next()
    } catch (error){
        return res.jsonUnauthorized(null, 'Invalid token')
    }
     
    //console.log('decoded',new Date(decoded.exp*1000))//para visualizar o horário qeu o mesmo expira

}

module.exports=checkJwt