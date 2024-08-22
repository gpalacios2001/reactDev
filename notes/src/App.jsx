import React, { useState, useEffect } from 'react'
import words from '../word_frequencies.json'
import { Table } from "antd"
import { Button, Checkbox, Form, Input } from 'antd';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.score - b.score
  }
]


const getRandomWord = () => {
  const keys = Object.keys(words)
  return keys[Math.floor(Math.random() * keys.length)]
}


const App = () => {
  const [score, setScore] = useState(0)
  const [scores, setScores] = useState([])
  const [word1, setWord1] = useState(getRandomWord())
  const [word2, setWord2] = useState(getRandomWord())
  const [newName, setNewName] = useState('')
  const [names, setNames] = useState('')

  const updateWords = () => {
    setWord1(getRandomWord())
    setWord2(getRandomWord())
  }

  const handleClick = (selectedWord) => {
    if (words[selectedWord] >= Math.max(words[word1], words[word2])) {
      setScore(score + 1)
    } else {
      addScore(newName, score)
      setScore(0)
      alert('you lost')
    }
    updateWords()
  }
  const addName = (event) => {
    //console.log('button clicked', event.target)
    setNames(names.concat(newName))
    //console.log(names)
  }
  const addScore = (name, score) => {
    const scoreObject = {
      key: Date.now(),
      name: name,
      score: score
    }
    setScores(prevScores => [...prevScores, scoreObject]);
    //console.log('after', scores, scores.length)

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>AEPI Lingo Bingo</h1>
      <h3>Pick the word below that you think has been sent the most in the Xi group chat. Get as many right in a row as you can. </h3>
      
      <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'space-between' }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Score: {score}</h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <Button onClick={() => handleClick(word1)} style={{ 
              height: '80px',
              width: '200px',
              fontSize: '24px',
            }}>{word1}</Button>
            <Button onClick={() => handleClick(word2)} style={{ 
              height: '80px',
              width: '200px',
              fontSize: '24px',
            }}>{word2}</Button>
          </div>
          
          <Form 
            style={{ width: '100%', maxWidth: '400px' }}
            onFinish={() => addName(newName)}
          >
            <Form.Item>
              <Input 
                value={newName}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
        
        <div style={{ width: '50%' }}>
          <Table 
            style={{ width: '100%' }}
            dataSource={scores} 
            columns={columns} 
            rowKey="key"
          />
        </div>
      </div>
    </div>
  )
}

export default App