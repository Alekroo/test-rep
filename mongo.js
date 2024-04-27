const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Argument error...')
  process.exit(1)
}


const password = process.argv[2]

const url =
  `mongodb+srv://alekrol97:${password}@cluster0.dhew9b9.mongodb.net/PersonDb?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3)
{
  Person.find({}).then(result => {
    console.log(`Phonebook:`)
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length === 5)
{
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
  console.log(`Added ${person.name} ${person.number} to phonebook`)
  mongoose.connection.close()
  })
}




/*note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

//Note.find({ important: true }).then(result => {
