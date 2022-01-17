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
  DeleteFilled,
} from "@ant-design/icons"
import renderHTML from "react-render-html"
import { UserContext } from "../../Context"

import Link from "next/link"

const Post = ({
  post,
  handleDelete,
  handleUnlike,
  handleLike,
  handleComment,
  showCommentCount = 10,
  removeComment,
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
      {post && post.postedBy && (
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
                <>
                  {handleUnlike ? (
                    <HeartFilled
                      onClick={() => handleUnlike(post._id)}
                      className='text-danger pt-2 h5 pr-5'
                    ></HeartFilled>
                  ) : (
                    <HeartFilled className='text-danger pt-2 h5 pr-5'></HeartFilled>
                  )}
                </>
              ) : (
                <>
                  {handleLike ? (
                    <HeartOutlined
                      onClick={() => handleLike(post._id)}
                      className='text-danger pt-2 h5 pr-5'
                    ></HeartOutlined>
                  ) : (
                    <HeartOutlined className='text-danger pt-2 h5 pr-5'></HeartOutlined>
                  )}
                </>
              )}

              <div
                className='pt-2 pl-5'
                style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
              >
                {post.likes.length} likes
              </div>
              {handleComment ? (
                <CommentOutlined
                  onClick={() => handleComment(post)}
                  className='te
                  xt-danger pt-2 h5 pl-5'
                  style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                ></CommentOutlined>
              ) : (
                <CommentOutlined
                  className='text-danger pt-2 h5 pl-5'
                  style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                ></CommentOutlined>
              )}

              <div
                className='pt-2 pl-5'
                style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
              >
                {handleComment ? (
                  <Link href={`/post/${post._id}`}>
                    <a>{post.comments.length} comments</a>
                  </Link>
                ) : (
                  <p>{post.comments.length} comments</p>
                )}
              </div>
              {state && state.user._id && state.user._id === post.postedBy._id && (
                <div>
                  <EditOutlined
                    onClick={(e) => {
                      router.push(`/user/post/${post._id}`)
                    }}
                    className='text-danger pt-2 h5 pl-5'
                  ></EditOutlined>

                  {handleDelete && (
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
                  )}
                </div>
              )}
            </div>
          </div>
          {post.comments && post.comments.length > 0 && (
            <ol
              className='list-group '
              style={{ maxHeight: "150px", overflow: "scroll" }}
            >
              {post.comments.slice(0, showCommentCount).map((comment) => (
                <li
                  key={comment._id}
                  className='list-group-item d-flex justify-content-between align-items-center'
                >
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
                  <div className='d-flex flex-column'>
                    <span className='badge badge-primary badge-pill btn-primary'>
                      {moment(comment.created).fromNow()}
                    </span>
                    <div className='m-auto h5'>
                      {state &&
                        state.user &&
                        state.user._id === comment.postedBy._id &&
                        removeComment && (
                          <DeleteFilled
                            onClick={() => removeComment(post._id, comment)}
                          />
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </>
  )
}

export default Post
