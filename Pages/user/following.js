import { useContext, useState, useEffect } from "react"
import { Avatar, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { UserContext } from "../../Context"
import axios from "axios"
import { RollbackOutlined } from "@ant-design/icons"
import Link from "next/link"
import { toast } from "react-toastify"

const PeopleComponent = () => {
  const router = useRouter()
  const [state, setState] = useContext(UserContext)

  const [people, setPeople] = useState([])

  useEffect(() => {
    if (state && state.token) {
      fetchFollowing()
    }
  }, [state && state.token])

  const fetchFollowing = async () => {
    const { data } = await axios.get("/user-following")
    setPeople(data)
  }
  const handleUnfollow = async (user) => {
    const { data } = await axios.put("/user-unfollow", { _id: user._id })
    // update local storage, update user, update toke
    let auth = JSON.parse(localStorage.getItem("auth"))
    auth.user = data
    localStorage.setItem("auth", JSON.stringify(auth))
    // update context
    setState({ ...state, user: data })

    // update people state
    let filtered = people.filter((person) => person._id !== user._id)
    setPeople(filtered)

    toast.error(`Unfollowed ${user.firstName}`)
  }
  const sourceImage = (user) => {
    if (user.image) {
      return <Avatar src={user.image}></Avatar>
    } else {
      return <Avatar size={30}>{user.firstName[0] + user.lastName[0]}</Avatar>
    }
  }
  return (
    <div className='row col-md-6 offset-3'>
      <List
        itemLayout='horizontal'
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={sourceImage(user)}
              title={
                <div className='d-flex justify-content-between'>
                  <p className='mt-1'>
                    {user.firstName} {user.lastName}
                  </p>
                  <span
                    onClick={() => handleUnfollow(user)}
                    className='text-primary pointer'
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      ></List>

      <Link href='/user/dashboard'>
        <a className='d-flex justify-content-center'>
          <RollbackOutlined></RollbackOutlined>
        </a>
      </Link>
    </div>
  )
}

export default PeopleComponent
