import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())
app.use(cors())

const users = []

app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name:  req.body.name,
            age:  req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/users', async ( req, res ) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.delete('/users/:id', async ( req, res ) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json({ message: 'usuario deletado'})
})

app.listen(3000)