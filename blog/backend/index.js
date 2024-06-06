const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')



const mongoUrl = 'mongodb+srv://gabrielpalacios:lola0827@cluster0.2iicupf.mongodb.net/Blogs?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})