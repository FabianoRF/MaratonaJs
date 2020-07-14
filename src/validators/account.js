//arquivo passado na rota que faz a validação antes de responser à requisição
const Joi =require('@hapi/joi')
const {getValidatorError} = require('../helpers/validator')


const accountSignUp = (req, res, next)=>{
    const {email, password, password_confirmation} = req.body

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),//expressao regular que delimita as regras de caracteres aceitos
        password_confirmation: Joi.string().valid(Joi.ref('password')).required()
    })

    const options= {abortEarly:false }
    const {error} = schema.validate({email, password, password_confirmation}, options)//o abort força todos os campos aserem validados

    if(error){
        const messages= getValidatorError(error, 'account.SignUp') 
        return res.jsonBadRequest(null, null, {error: messages})
    }
    
    next()
}

module.exports= {accountSignUp}