import { useContext } from "react"
import { Avatar, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { UserContext } from "../../Context"
import Link from "next/link"

const PeopleComponent = ({ people, handleFollow, handleUnfollow }) => {
  const router = useRouter()
  const [state, setState] = useContext(UserContext)

  const sourceImage = (user) => {
    if (user.image) {
      return <Avatar src={user.image.url}></Avatar>
    } else {
      return <Avatar size={30}>{user.firstName[0] + user.lastName[0]}</Avatar>
    }
  }
  return (
    <div>
      <List
        itemLayout='horizontal'
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Link href={`/user/${user.username}`}>
                  <a className='' style={{ color: "black" }}>
                    {sourceImage(user)}{" "}
                  </a>
                </Link>
              }
              title={
                <div className='d-flex justify-content-between'>
                  <Link href={`/user/${user.username}`}>
                    <a className='' style={{ color: "black" }}>
                      <p className='mt-1'>
                        {user.firstName} {user.lastName}
                      </p>
                    </a>
                  </Link>

                  {state &&
                  state.user &&
                  user &&
                  user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className='text-primary pointer'
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className='text-primary pointer'
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  )
}

export default PeopleComponent
