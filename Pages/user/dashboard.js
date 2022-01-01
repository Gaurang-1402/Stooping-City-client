import { UserContext } from "../../Context"
import { useContext } from "react"
import UserRoute from "../../Routes/UserRoute"

const Dashboard = () => {
  // we have access to global state using this piece of code
  return (
    // remember --> you have to JSON.stringify state if it is an object
    // wrapper component to protect route
    <UserRoute>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='display-1 py-5'>Dashboard</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  )
}

export default Dashboard
