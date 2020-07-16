const express = require('express')
const { Link }= require('../models')
const {getMessage}= require('../helpers/messages')

const router = express.Router()

router.get('/', async(req, res)=>{
    const {accountId} = req
    const links = await Link.findAll({where: {accountId}})
  
    return res.jsonOK(links, getMessage('response.json_ok'));
})

router.get('/:id', async(req, res)=>{//procura somente um link
    const {accountId} = req
    const { id }=req.params

    const link= await Link.findOne({where: {id, accountId}})//faz a query
    if(!link) return res.jsonNotFound()

    return res.jsonOK(link, getMessage('response.json_ok'))
})

router.post('/', async(req, res)=>{
    const {accountId} = req
    const {label, url, isSocial} = req.body

    const image='https://google.com/image.jpg'


    const link = await Link.create({label, url, isSocial, image, accountId})

    return res.jsonOK(link, getMessage('response.json_ok'))
})

router.put('/:id', async(req, res)=>{
    const {accountId, body} = req
    const { id }=req.params
    const fields = ['label', 'url', 'isSocial']

    const link= await Link.findOne({where: {id, accountId}})//faz a query
    if(!link) return res.jsonNotFound()

    //é importante fazer esse map nos fields para evitar a possibilidade de mudar o id
    fields.map(fieldName=>{
        const newValue= body[fieldName] 

        if(newValue !== undefined) link[fieldName]=newValue
    })

    await link.save()

    return res.jsonOK(link, getMessage('response.json_ok'))  
})

router.delete('/:id', async(req, res)=>{
    const {accountId} = req
    const { id }=req.params

    const link= await Link.findOne({where: {id, accountId}})//faz a query
    if(!link) return res.jsonNotFound()

    await link.destroy()

    return res.jsonOK(null, getMessage('response.json_ok'))
})


module.exports= router