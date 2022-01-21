import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { SyncOutlined } from "@ant-design/icons"
import { UserContext } from "../Context/index"

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false)
  const router = useRouter()
  const [state] = useContext(UserContext)

  useEffect(() => {
    if (state && state.token) getCurrentUser()
  }, [state && state.token])

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`)
      if (data.ok) setOk(true)
    } catch (err) {
      router.push("/login")
    }
  }

  process.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentUser()
    }, 1000)

  return !ok ? (
    <div className='dark d-flex' style={{ height: "100vh" }}>
      <div className='m-auto' v>
        <SyncOutlined
          style={{ width: "300px" }}
          spin
          className='d-flex justify-content-center display-1 text-primary p-5'
        />
      </div>
    </div>
  ) : (
    <> {children}</>
  )
}

export default UserRoute
