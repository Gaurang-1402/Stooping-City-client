import React from "react"
// now there is an issue with importing purely client
// side packages while using next.js because next.js is
// both client side and server side
// We can't do this: import ReactQuill from "react-quill" // ES6
// Instead, we gotta do this:
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import { Avatar } from "antd"
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons"

// recieve the following as props from parent page
// and fire them off when appropriate
const PostForm = ({
  handlePostSubmit,
  postContent,
  setPostContent,
  handleImageUpload,
  image,
  uploading,
}) => {
  return (
    <>
      <div className='card'></div>
      <div className='card-body pb-3'>
        <form className='form-group'>
          <ReactQuill
            theme='snow'
            value={postContent}
            onChange={(e) => setPostContent(e)}
            className='form-control'
            placeholder='Write something...'
          />
        </form>
      </div>

      <div className='card-footer d-flex justify-content-between text-muted'>
        <button
          onClick={handlePostSubmit}
          className='btn btn-primary btn-sm mt-1'
        >
          Post
        </button>

        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className='mt-1'></Avatar>
          ) : uploading ? (
            <LoadingOutlined className='mt-2'></LoadingOutlined>
          ) : (
            <CameraOutlined className='mt-2'></CameraOutlined>
          )}

          <input
            onChange={handleImageUpload}
            type='file'
            accept='images/*'
            hidden
          />
        </label>
      </div>
    </>
  )
}

export default PostForm
