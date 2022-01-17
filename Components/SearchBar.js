import { useState, useContext } from "react"
import { UserContext } from "../Context"
import axios from "axios"
import PeopleComponent from "../Components/Cards/PeopleComponent"
import { toast } from "react-toastify"

const SearchBar = () => {
  const [state, setState] = useContext(UserContext)
  const [query, setQuery] = useState("")

  const [result, setResult] = useState([])

  const handleUnfollow = async (user) => {
    const { data } = await axios.put("/user-unfollow", { _id: user._id })
    // update local storage, update user, update toke
    let auth = JSON.parse(localStorage.getItem("auth"))
    auth.user = data
    localStorage.setItem("auth", JSON.stringify(auth))
    // update context
    setState({ ...state, user: data })

    // update people state
    let filtered = result.filter((person) => person._id !== user._id)
    setResult(filter)
    toast.error(`Unfollowed ${user.firstName}`)
  }
  const sourceImage = (user) => {
    if (user.image) {
      return <Avatar src={user.image}></Avatar>
    } else {
      return <Avatar size={30}>{user.firstName[0] + user.lastName[0]}</Avatar>
    }
  }

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id })
      // update local storage, update user, update toke
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      localStorage.setItem("auth", JSON.stringify(auth))
      // update context
      setState({ ...state, user: data })

      // update people state
      let filtered = result.filter((person) => person._id !== user._id)
      setResult(filtered)

      toast.success(`Following ${user.firstName}`)
    } catch (err) {
      console.log(err)
    }
  }

  const searchUser = async (e) => {
    e.preventDefault()
    console.log(`Find "${query}" from DB `)
    const { data } = await axios.get(`/search-user/${query}`)
    console.log("search result => ", data)
    setResult(data)
  }
  return (
    <div>
      <form className='form-inline row' onSubmit={searchUser}>
        <div className='col-8'>
          <input
            onChange={(e) => {
              setQuery(e.target.value)
              setResult([])
            }}
            value={query}
            className='form-control'
            type='search'
            placeholder='Search'
          />
        </div>
        <div className='col-4'>
          <button
            className='btn btn-outline-primary col-12'
            type='submit'
            onClick={(e) => searchUser(e)}
            disabled={query === ""}
          >
            Search
          </button>
        </div>
      </form>

      {result && result === [] ? (
        <p>No results</p>
      ) : (
        result.map((r) => (
          <div key={r._id} className='pt-2'>
            <PeopleComponent
              handleFollow={handleFollow}
              handleUnfollow={handleUnfollow}
              className='pt-2'
              people={result}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default SearchBar
