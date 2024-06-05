require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
/*
morgan.token('req-body', (req) => {
  return JSON.stringify(req.body);
})

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
*/

app.use(express.json())
//app.use(requestLogger)
app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
    
  }
  else{
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log('should print')
  const body = request.body
  console.log("au",body.name, body.number)
 
  const person = new Person ({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    console.log('worked', savedPerson)
    response.json(savedPerson)
  })
  
})
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}



app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})