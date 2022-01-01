import { UserContext } from "../Context"
import { useContext } from "react"

const Home = () => {
  // we have access to global state using this piece of code
  const [state, setState] = useContext(UserContext)
  return (
    // remember --> you have to JSON.stringify state if it is an object
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='display-1 py-5'>Home</h1>
          <img
            className='d-flex justify-content-center w-50 '
            src='/images/default.jpg'
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Home
