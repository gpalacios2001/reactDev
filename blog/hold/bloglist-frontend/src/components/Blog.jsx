import { useState } from 'react'
const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
  <div style = {hideWhenVisible}>
    {blog.title} {blog.author}
    <button onClick = {toggleVisibility}>
      view
    </button>
  </div>  
  <div style = {showWhenVisible}>
  {blog.title} {blog.author}
  <button onClick = {toggleVisibility}>
      hide
    </button>
    <br></br>
    likes {blog.likes}
    <button onClick = {addLike}>
      like
    </button>
    <br></br>
    {blog.author}

  </div>
  </div>
)
}

export default Blog