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

const PostList = ({ posts }) => {
  const [state, setState] = useContext(UserContext)
  const router = useRouter()
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
                    <Avatar size={40}>
                      {post.postedBy.firstName[0] + post.postedBy.lastName[0]}
                    </Avatar>

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
                    <HeartOutlined className='text-danger pt-2 h5 pr-5'></HeartOutlined>
                    <div
                      className='pt-2 pl-5'
                      style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                    >
                      3 likes
                    </div>
                    <CommentOutlined
                      className='text-danger pt-2 h5 pl-5'
                      style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                    ></CommentOutlined>
                    <div
                      className='pt-2 pl-5'
                      style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
                    >
                      2 comments
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
                          ></DeleteOutlined>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default PostList
