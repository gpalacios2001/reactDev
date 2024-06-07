const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs)  =>{
    if(blogs.length === 0) {
        return 0
    }
    const initialValue = 0;
    const sumWithInitial = blogs.reduce(
  (accumulator, currentValue) => accumulator + currentValue.likes,
  initialValue)
  return sumWithInitial
  }
  
  module.exports = {
    dummy,
    totalLikes
  }