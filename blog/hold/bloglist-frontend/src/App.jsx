import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null})
  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  const notifyWith = (message, type='info') => {
    console.log('notified')
    console.log('message', message)
    console.log('type', type)
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null} )
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('aqui', exception)
      const errorMessage = 'wrong credentials'  // Set a meaningful error message
      setErrorMessage(errorMessage)
      notifyWith(errorMessage, 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (blogObject) => {
    
    try {
      blogFormRef.current.toggleVisibility()
      blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
        notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added!`)
      })
    } catch (exception) {
      const errorMessage = 'error adding blog'  // Set a meaningful error message
      setErrorMessage(errorMessage)
      notifyWith(errorMessage, 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = id => {
    console.log('id', id)
    const blog = blogs.find(b => b.id === id)
    console.log('blog', blog)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
  
    blogService
      .update(id, changedBlog)
        .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setErrorMesssage(
          `Blog '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const Input = ({ value, description, type, handleChange }) => {
    return (
        <div>
          {description}
            <input
            type= {type}
            value= {value}
            onChange={handleChange}
          />
        </div>
    )
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={info} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }
  const blogsToShow = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} addLike={()=> addLike(blog.id)} />
  )
  


  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      <div>
        {user.name} logged in
        <button onClick = {handleLogout}> logout
      </button>
      </div>
      <Togglable buttonLabel='new blog' ref = {blogFormRef}>
      <BlogForm createBlog={addBlog}></BlogForm>

      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={()=> addLike(blog.id)} />
      )}
    </div>
  )
}

export default App