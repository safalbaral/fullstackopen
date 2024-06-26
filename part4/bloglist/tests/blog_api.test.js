const { test, after, beforeEach, describe } = require('node:test')
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

describe('Tests related to deleting and updating a blog entry', async() => {
  test('can delete a blog entry', async() => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const currentBlogs = await helper.blogsInDb()

    assert.strictEqual(currentBlogs.length, initialBlogs.length - 1)

    const ids = currentBlogs.map(r => r.id)
    assert(!ids.includes(blogToDelete.ids))
  })
})

describe('Tests related to creating a new blog entry', async () => {
  test('returns 400 Bad Request if title or url are not present in request', async () => {
    const newBlog = {
      'title': 'A Test',
      'author': 'John Doe',
      'url': 'example.com',
      'likes': 90
    }

    const { 'url': url, ...withoutURL } = newBlog
    const { 'title': title, ...withoutTitle } = newBlog

    await api.post('/api/blogs')
      .send(withoutURL)
      .expect(400)

    await api.post('/api/blogs')
      .send(withoutTitle)
      .expect(400)
  })

  test('like property defaults to 0 if not present in request', async() => {
    const newBlog = {
      'title': 'Test',
      'author': 'John Doe',
      'url': 'example.com'
    }

    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body.hasOwnProperty('likes'), 'Response must contain "likes" property')
    assert.strictEqual(response.body.likes, 0)
  } )

  test('a valid blog entry can be added', async () => {
    let originalBlogLength = (await api.get('/api/blogs').expect('Content-Type', /application\/json/))

    originalBlogLength = originalBlogLength.body.length

    const newBlog = {
      'title': 'Other Test',
      'author': 'John Doez',
      'url': 'example.com',
      'likes': 10
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
})

after(async () => {
  await mongoose.connection.close()
})