import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import UserRoute from "../../Routes/UserRoute"
import Post from "../../Components/Cards/Post"
import Link from "next/link"
import { RollbackOutlined } from "@ant-design/icons"

const PostComment = () => {
  const router = useRouter()
  const _id = router.query._id

  const [post, setPost] = useState({})

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`)
      setPost(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (_id) {
      fetchPost()
    }
  }, [_id])

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure?")
    if (!answer) return
    console.log("Post ID currently is", postId)
    console.log("Comment currently is", comment)
    try {
      const { data } = await axios.put("/remove-comment", {
        postId: postId,
        comment: comment,
      })

      console.log("comment removed", data)

      fetchPost()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {post && post.postedBy && (
        <div className='container-fluid'>
          <div className='row py-5 text-light bg-default-image'>
            <div className='col text-center'>
              <h1>{post.postedBy.firstName}'s post</h1>
            </div>
          </div>

          <Link href='/user/dashboard'>
            <a className='d-flex justify-content-center h2 pt-3'>
              <RollbackOutlined></RollbackOutlined>
            </a>
          </Link>

          <div className='d-flex offset-md-2 row col-8 pt-5'>
            <Post
              post={post}
              showCommentCount={100}
              removeComment={removeComment}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PostComment
