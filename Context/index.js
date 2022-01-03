// all context api files are supposed to be called index.js

// context api is available in react
import { useState, createContext, useEffect } from "react"

import { useRouter } from "next/router"
import axios from "axios"

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

  const router = useRouter()

  // axios configuration is in index.js so it applies to the entire
  // app in one go

  // axios configuration so we don't keep repeating the same
  // bearer token mention in the headers
  // and set default URL from environment variables, leaving
  // only endpoints needed to be men requests
  const token = state && state.token ? state.token : ""
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  // documentation: https://github.com/axios/axios
  // auto logout once jwt token expires
  axios.interceptors.response.use(
    function (response) {
      // Do something before request is sent
      return response
    },
    function (error) {
      // error generated calls for jwt token expiry so we do this here
      // Do something with request error
      let res = error.response
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null)
        window.localStorage.removeItem("auth")
        router.push("/login")
      }
    }
  )

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
