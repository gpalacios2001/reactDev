const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./btest_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.blogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('correct quantity of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.blogs.length)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "woot woot",
        author: "Michael Lehroff",
        url: "https://lesgo.com/",
        likes: 12
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)
  
  
    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('woot woot'))
  })

test('blogs contain id key', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.id)
    assert(!contents.includes(undefined))
  })



after(async () => {
  await mongoose.connection.close()
})