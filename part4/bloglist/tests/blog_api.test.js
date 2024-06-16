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

after(async () => {
  await mongoose.connection.close()
})