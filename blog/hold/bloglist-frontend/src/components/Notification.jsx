const Notification = ({ info }) => {
    if (!info.message) {
      return
    }
    console.log(info.type)
  
    const style = {
      color: info.type==='error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    console.log('here')
    return (
    
      <div style={style}>
        {info.message}
      </div>
    )
  }
  
  export default Notification