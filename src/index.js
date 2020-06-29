const express=require('express')
const authController=require('./controllers/auth')
const app= express()

app.use('/auth', authController) //usa as rotas /auth/sign-in e/auth/sign-up

app.get('/', (req, res)=>{
    return res.json('APi running...')
})


app.listen(3333, ()=>{
    console.log("listennig on board 3333")
})

