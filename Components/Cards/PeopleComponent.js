import { useContext } from "react"
import { Avatar, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { UserContext } from "../../Context"

const PeopleComponent = ({ people, handleFollow }) => {
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
              avatar={sourceImage(user)}
              title={
                <div className='d-flex justify-content-between'>
                  <p className='mt-1'>
                    {user.firstName} {user.lastName}
                  </p>
                  <span
                    onClick={() => handleFollow(user)}
                    className='text-primary pointer'
                  >
                    Follow
                  </span>
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
