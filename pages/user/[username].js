import { useContext, useState, useEffect } from "react"
import { Avatar, Card } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { UserContext } from "../../Context"
import axios from "axios"
import { RollbackOutlined } from "@ant-design/icons"
import Link from "next/link"
import { toast } from "react-toastify"

const UsernameComponent = () => {
  const router = useRouter()
  const [state, setState] = useContext(UserContext)

  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(router.query.username)
    if (router.query.username) {
      fetchUser()
      console.log("exexute")
    } else {
      console.log("fail")
    }
  }, [router.query.username])

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`)

      setUser(data)
    } catch (err) {
      console.log(err)
    }
  }

  const sourceImage = (user) => {
    if (user.image) {
      return (
        <Avatar className='m-auto' size={300} src={user.image.url}></Avatar>
      )
    } else {
      return (
        <Avatar className='m-auto' size={300}>
          <p style={{ fontSize: "150px" }}>
            {user.firstName[0] + user.lastName[0]}
          </p>
        </Avatar>
      )
    }
  }
  return (
    <div
      style={{ height: "100vh" }}
      className='row dark col-md-6 offset-3 mb-2'
    >
      {user && user.firstName && user.lastName && (
        <div className='pt-5 pb-5'>
          {" "}
          <Card hoverable>
            <div className='d-flex pb-5'>{sourceImage(user)}</div>
            <Card.Meta
              title={user.firstName + " " + user.lastName}
              description={user.about}
            ></Card.Meta>

            <p className='pt-2 text-muted'>
              {" "}
              Joined {moment(user.createdAt).fromNow()}
            </p>

            <div className='d-flex justify-content-between'>
              <span className='btn btn-sm'>
                {user.followers && user.followers.length} Followers
              </span>

              <span className='btn btn-sm'>
                {user.following && user.following.length} Following
              </span>
            </div>
          </Card>
        </div>
      )}

      <Link href='/user/dashboard'>
        <a className='d-flex justify-content-center pt-4'>
          <RollbackOutlined></RollbackOutlined>
        </a>
      </Link>
    </div>
  )
}

export default UsernameComponent
