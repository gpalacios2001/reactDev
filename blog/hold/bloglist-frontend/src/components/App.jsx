import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Form = (props) => {
  return (
    <form onSubmit={props.addName}>      
        <div>
          name: <input
          value = {props.newName}
          onChange = {props.handleNameChange}/>
        </div>
        <div>
          number: <input 
          value = {props.newNumber}
          onChange = {props.handleNumberChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}
const Person = ({person, del}) => {
  const label = "delete"
  return (
    <li>{person.name} {person.number}
    <button onClick = {del}>{label}</button>
    </li>
  )
}

const People = ({persons, del}) => {
  console.log(persons, "w")
  return (
    <div>
      {persons.map(person => 
      <Person key={person.id} person={person} del = {()=> del(person.id)}
      />
    )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addName = (event) => {
    if (persons.map(person => 
      person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

    personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })
    }
  }
  
  const delOf = (id) => {
    if (window.confirm(`Do you really want to delete ${id}?`)) {
      console.log(`Deleting person with id: ${id}`)
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error(`error:`, error)
          alert(`The person was already deleted from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

  return (
    <div>
      <h1>Phonebook</h1>
      <Form addName = {addName} newName = {newName}
      handleNameChange = {handleNameChange} newNumber = {newNumber}
      handleNumberChange = {handleNumberChange}></Form>
      <h2>Numbers</h2>
      <People persons={persons} del = {delOf}></People>
    </div>
  )
}

export default App

  
  