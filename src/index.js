const express=require('express')
const authController=require('./controllers/auth')
const db = require('./models')


const app= express()

app.use('/auth', authController) //usa todas rotas do auth

app.get('/', (req, res)=>{
    return res.json('APi running...')
})


db.sequelize.sync().then(()=>{//retorna uma promisse, agr so inicia o servidor depois de sincronizar
    app.listen(3333, ()=>{
    console.log("listennig on board 3333")
})
})



