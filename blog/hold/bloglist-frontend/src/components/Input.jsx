const Input = ({title}) => {
    return (
        <div>
          title
            <input
            type="text"
            value= {title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
    )
}
export default Input