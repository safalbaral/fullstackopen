const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 2)
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual('_id' in response.body[0], false)
  assert.strictEqual('id' in response.body[0], true)
} )

test('a valid blog entry can be added', async () => {
  let originalBlogLength = (await api.get('/api/blogs').expect('Content-Type', /application\/json/))
  
  originalBlogLength = originalBlogLength.body.length;

  const newBlog = {  
      "title": "Test",
      "author": "John Doe",
      "url": "example.com",
      "likes": 10
    }

    const response = await api.post('/api/blogs')
                              .send(newBlog)
                              .expect(201)
                              .expect('Content-Type', /application\/json/)

    const newBlogLength = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    assert.strictEqual(newBlogLength.body.length, originalBlogLength + 1)
    
    delete response.body.id // Delete for comparison

    assert.equal(JSON.stringify(response.body), JSON.stringify(newBlog)) // Compares by value for the entry saved in database and entry sent
})

after(async () => {
  await mongoose.connection.close()
})