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
              <div key={post._id} className='card-mb-2 mt-3'>
                <div className='card-header d-flex justify-content-between'>
                  <div>
                    {sourceImage(post.postedBy)}

                    <span className='pt-2 ml-3' style={{ marginLeft: "1rem" }}>
                      {post.postedBy.firstName} {post.postedBy.lastName}
                    </span>
                  </div>
                  <span className='pt-2 ml-3' style={{ marginLeft: "1rem" }}>
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
                <div className='card-body'>{renderHTML(post.postContent)}</div>
                <div className='card-footer'>
                  {post.image && (
                    <div
                      style={{
                        backgroundImage: "url(" + post.image.url + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        height: "300px",
                      }}
                    ></div>
                  )}
                  <div className='d-flex pt-2'>
                    {state &&
                    state.user &&
                    post.likes &&
                    post.likes.includes(state.user._id) ? (
                      <HeartFilled
                        onClick={() => handleUnlike(post._id)}
                        className='text-danger pt-2 h5 pr-5'
                      ></HeartFilled>
                    ) : (
                      <HeartOutlined
                        onClick={() => handleLike(post._id)}
                        className='text-danger pt-2 h5 pr-5'
                      ></HeartOutlined>
                    )}

                    <div
                      className='pt-2 pl-5'
                      style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                    >
                      {post.likes.length} likes
                    </div>
                    <CommentOutlined
                      onClick={() => handleComment(post)}
                      className='text-danger pt-2 h5 pl-5'
                      style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                    ></CommentOutlined>
                    <div
                      className='pt-2 pl-5'
                      style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                    >
                      <Link href={`/post/${post._id}`}>
                        <a>{post.comments.length} comments</a>
                      </Link>
                    </div>
                    {state &&
                      state.user._id &&
                      state.user._id === post.postedBy._id && (
                        <div>
                          <EditOutlined
                            onClick={(e) => {
                              router.push(`/user/post/${post._id}`)
                            }}
                            className='text-danger pt-2 h5 pl-5'
                          ></EditOutlined>

                          <DeleteOutlined
                            className='text-danger pt-2 h5 pl-5'
                            style={{
                              marginRight: "1rem",
                              marginLeft: "0.5rem",
                            }}
                            onClick={() => {
                              handleDelete(post)
                            }}
                          ></DeleteOutlined>
                        </div>
                      )}
                  </div>
                </div>
                {post.comments && post.comments.length > 0 && (
                  <ul className='list-group'>
                    {post.comments.map((comment) => (
                      <li className='list-group-item d-flex justify-content-between align-items-center'>
                        <div className='ms-2 me-auto'>
                          <div>
                            <Avatar
                              size={30}
                              className=''
                              src={sourceImage(comment.postedBy)}
                            />
                          </div>
                          <i className='text-muter'>{comment.text}</i>
                        </div>

                        <span className='badge badge-primary badge-pill btn-primary'>
                          {moment(comment.created).fromNow()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
      </div>
    </>
  )
}

export default PostList
