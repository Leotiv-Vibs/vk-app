const express = require(`express`)
const pgp = require("pg-promise")()
const server = express()

const db = pgp(`${process.env.DATABASE_URL}?ssl=false`)

server.listen(process.env.PORT || 8080)

server.get(`/addProfile`, (request, response) => {
    db.query(`insert into tellida.profiles (userid, description, occupation, city) values (${request.query.userid}, '${request.query.description}', '${request.query.occupation.toLowerCase()}', '${request.query.city.toLowerCase()}')`)
        .then(() =>{
            response.sendStatus(200)
        })
})

server.get(`/profiles`, (request, response) => {
    db.query(`select * from tellida.profiles where city = '${request.query.city.toLowerCase()}'`)
        .then((data) =>{
            response.json(data)
        })
})

server.get(`/profilesByOccupation`, (request, response) => {
    db.query(`select * from tellida.profiles where occupation = '${request.query.occupation}' and city = '${request.query.city.toLowerCase()}'`)
        .then((data) =>{
            response.json(data)
        })
})

server.use((err, request, response, next) => {
    // логирование ошибки, пока просто console.log
    console.log(err)
    response.status(500).send(`Something broke!`)
})

