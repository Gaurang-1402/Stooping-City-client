// all context api files are supposed to be called index.js

// context api is available in react
import { useState, createContext, useEffect } from "react"

// to execute context do this
const UserContext = createContext()

// think of context as global state. Any compoent can access
// state stored in context

// we use UserProvider in a way such that anything wrapped inside
// userprovider will have access to the children props
const UserProvider = ({ children }) => {
  // when user logs in, we will update state in context
  const [state, setState] = useState({
    user: {},
    token: "",
  })

  // if we have something in windows local storage update state with that information
  // to retrieve what is stored in local storage we enter
  // window.localStorage.getItem("auth") where "auth" is the key
  // we have to JSON.parse() what has been JSON stringified
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")))
  }, []) // this is same as component did mount

  // we wrap app component with UserContext.Provider
  // because then we can access the state in context in every component
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
