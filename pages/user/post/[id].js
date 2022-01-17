import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import UserRoute from "../../../Routes/UserRoute"
import PostForm from "../../../Components/PostForm"
import "react-quill/dist/quill.snow.css"
import { toast } from "react-toastify"

const editPost = () => {
  const router = useRouter()
  const [post, setPost] = useState({})
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  // router has a property called query that you can use to
  // get the endpoint of the url
  const _id = router.query.id

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`)
      setPost(data.postContent)
      setImage(data.image)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (_id) {
      fetchPost()
    }
  }, [_id])

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/update-post/${_id}`, { post, image })
      console.log(data)

      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Post updated")
        router.push("/user/dashboard")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append("image", file)

    setUploading(true)
    try {
      const { data } = await axios.post("/upload-image", formData)
      setImage({ url: data.url, public_id: data.public_id })
      // console.log("uploaded image => ", data)
      setUploading(false)
    } catch (err) {
      console.log(err)
      setUploading(false)
    }
  }

  return (
    <UserRoute>
      <div className='container-fluid'>
        <div className='row py-5 text-light bg-default-image'>
          <div className='col text-center'>
            <h1>Update Post</h1>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col-md-8 offset-md-2'>
            <PostForm
              handlePostSubmit={handlePostSubmit}
              postContent={post}
              setPostContent={setPost}
              handleImageUpload={handleImageUpload}
              uploading={uploading}
              image={image}
            ></PostForm>
          </div>
        </div>
        <br />
      </div>
    </UserRoute>
  )
}

export default editPost
