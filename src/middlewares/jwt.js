const {verifyJwt}= require('../helpers/jwt')

const checkJwt = (req, res, next)=>{
    // /auth/sign-in
    // /auth/sign-up
    const {url: path} =req;//retorna a rota que se encontra

    const excludedPaths = ['/auth/sign-in', '/auth/sign-up']
    const isExcluded = !!excludedPaths.find( p => p.startsWith(path))//verifica se inicia com o o path desejado, o !! tranforma em boll

    if(isExcluded) return next()//nao verifica rotas desnecessárias

    let token = req.headers['authorization']
    token= token ? token.slice(7, token.length) : null//tira o bearer

    if(!token){
        return res.jsonUnauthorized(null, 'Invalid token')
    }
    
    try{
        const decoded = verifyJwt(token)
        req.accountId = decoded.id
    
        next()
    } catch (error){
        return res.jsonUnauthorized(null, 'Invalid token')
    }
     
    //console.log('decoded',new Date(decoded.exp*1000))//para visualizar o horário qeu o mesmo expira

}

module.exports=checkJwt