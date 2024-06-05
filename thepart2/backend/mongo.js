const mongoose = require('mongoose')

if (process.argv.length<5) {
  console.log('give all arguments')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://gabrielpalacios:${password}@cluster0.2iicupf.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(result => {
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})