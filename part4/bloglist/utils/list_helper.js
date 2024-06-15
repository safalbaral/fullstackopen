const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
  console.log('HERED IST THE SUM', sum)
  return sum
}

const favouriteBlog = (blogs) => {
  let max = 0
  let max_index = 0

  blogs.forEach((blog, idx) => {
    if (blog.likes > max) {
      max = blog.likes
      max_index = idx
    }
  })

  return blogs[max_index]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}