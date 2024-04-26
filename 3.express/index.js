const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
var persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

var largestId = 4


  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/info', (request, response) => {
    const currentDateAndTime = new Date().toString();
    response.send(`Phonebook has info for ${persons.length} people <br/> ${currentDateAndTime}`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    }
    if (!body.number) {
        return response.status(400).json({ 
          error: 'number is missing' 
        })
    }
    if(persons.find(p => p.name === body.name))
    {
        return response.status(400).json({ 
            error: 'name already exists' 
          })
    } 
    
    const newId = Math.floor(Math.random() * 100000);
    const person = {
        id: newId,
        name: body.name,
        number: body.number,
      }
    
      persons = persons.concat(person)
    
      response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })