import { useState, useContext } from "react"
import { Avatar } from "antd"
import { useRouter } from "next/router"
// npm i moment react-render-html
import moment from "moment"
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import renderHTML from "react-render-html"
import { UserContext } from "../../Context"

import Link from "next/link"

import Post from "./Post"

const PostList = ({
  posts,
  handleDelete,
  handleUnlike,
  handleLike,
  handleComment,
}) => {
  const [state, setState] = useContext(UserContext)
  const router = useRouter()
  const sourceImage = (user) => {
    if (user.image) {
      return <Avatar src={user.image.url}></Avatar>
    } else {
      return <Avatar size={30}>{user.firstName[0] + user.lastName[0]}</Avatar>
    }
  }
  return (
    <>
      {" "}
      <div className=''>
        {posts &&
          posts.map((post) => {
            return (
              <Post
                key={post._id}
                post={post}
                handleDelete={handleDelete}
                handleUnlike={handleUnlike}
                handleLike={handleLike}
                handleComment={handleComment}
              />
            )
          })}
      </div>
    </>
  )
}

export default PostList
