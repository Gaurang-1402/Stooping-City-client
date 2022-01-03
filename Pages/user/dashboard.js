import { UserContext } from "../../Context"
import { useContext, useState, useEffect } from "react"
import UserRoute from "../../Routes/UserRoute"
import CreatePostForm from "../../Components/CreatePostForm"
import axios from "axios"
import { toast } from "react-toastify"
import "react-quill/dist/quill.snow.css"
import PostList from "../../Components/Cards/PostList"

const Dashboard = () => {
  // we have access to global state using this piece of code

  // pass these state vars postContent, setPostContent and handlePostSubmit
  // function into CreatePostForm component to fire them there
  const [postContent, setPostContent] = useState("")
  const [state, setState] = useContext(UserContext)
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    if (state && state.token) {
      fetchPosts()
    }
  }, [state && state.token])

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts")
      console.log("user posts => ", data[0])
      setPosts(data)
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

  const handlePostSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("/create-post", {
        postContent,
        image,
      })

      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Post created!")
        fetchPosts()
        setPostContent("")
        setImage({})
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    // remember --> you have to JSON.stringify state if it is an object
    // wrapper component to protect route
    <UserRoute>
      <div className='container-fluid'>
        <div className='row py-5 text-light bg-default-image'>
          <div className='col text-center'>
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col-md-8'>
            <CreatePostForm
              handlePostSubmit={handlePostSubmit}
              postContent={postContent}
              setPostContent={setPostContent}
              handleImageUpload={handleImageUpload}
              uploading={uploading}
              image={image}
            ></CreatePostForm>
            <PostList posts={posts}></PostList>
          </div>
          <div className='col-md-4' style={{ height: "1vh" }}>
            Sidebar
          </div>
        </div>
        <br />
      </div>
    </UserRoute>
  )
}

export default Dashboard
