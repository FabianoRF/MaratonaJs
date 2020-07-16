const express=require('express')
const db = require('./models')
const response = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')

const authController=require('./controllers/auth')
const linkController=require('./controllers/link')

const app= express()

app.use(response)
app.use(checkJwt)

//midlewares para aceitar os bodys
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/auth', authController) //usa todas rotas do auth
app.use('/link', linkController) //usa todas rotas do auth

app.get('/', (req, res)=>{
    return res.json('APi running...')
})

db.sequelize.sync().then(()=>{//retorna uma promisse, agr so inicia o servidor depois de sincronizar
    app.listen(3333, ()=>{
        console.log("listennig on board 3333")
    })
})



