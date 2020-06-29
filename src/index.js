const express=require('express')

const app= express()

app.get('/', (req, res)=>{
    return res.json('APi running...')
})


app.listen(3333, ()=>{
    console.log("listennig on board 3333")
})

