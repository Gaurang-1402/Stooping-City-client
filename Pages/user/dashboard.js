import { UserContext } from "../../Context"
import { useContext, useState, useEffect } from "react"
import UserRoute from "../../Routes/UserRoute"
import PostForm from "../../Components/PostForm"
import axios from "axios"
import { toast } from "react-toastify"
import "react-quill/dist/quill.snow.css"
import PostList from "../../Components/Cards/PostList"
import PeopleComponent from "../../Components/Cards/PeopleComponent"
import Link from "next/link"
import { Modal, Pagination } from "antd"
import CommentForm from "../../Components/CommentForm"
import SearchBar from "../../Components/SearchBar"

const Dashboard = () => {
  // we have access to global state using this piece of code

  // pass these state vars postContent, setPostContent and handlePostSubmit
  // function into CreatePostForm component to fire them there
  const [postContent, setPostContent] = useState("")
  const [state, setState] = useContext(UserContext)
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)
  // state for posts
  const [posts, setPosts] = useState([])
  // state for people
  const [people, setPeople] = useState([])

  // state for comments
  const [currPost, setCurrPost] = useState({})
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState("")

  // state for pagination
  const [totalPosts, setTotalPosts] = useState(0)
  const [currPageNumber, setCurrPageNumber] = useState(1)

  useEffect(async () => {
    try {
      const { data } = await axios.get("/all-posts")

      setTotalPosts(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleComment = (post) => {
    setCurrPost(post)
    setVisible(true)
  }

  const addComment = async (event) => {
    event.preventDefault()
    // console.log("Post ID currently is", currPost._id)
    // console.log("Comment currently is", comment)

    try {
      const { data } = await axios.put("/add-comment", {
        postId: currPost._id,
        comment: comment,
      })

      console.log("add comment", data)
      setVisible(false)
      setComment("")
      fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (state && state.token) {
      fetchPosts()
      fetchPeople()
    }
  }, [state && state.token, currPageNumber])

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id })
      // update local storage, update user, update toke
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      localStorage.setItem("auth", JSON.stringify(auth))
      // update context
      setState({ ...state, user: data })

      // update people state
      let filtered = people.filter((person) => person._id !== user._id)
      setPeople(filtered)
      fetchPosts()

      toast.success(`Following ${user.firstName}`)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPeople = async () => {
    try {
      const { data } = await axios.get("/find-people")
      console.log(data)
      setPeople(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${currPageNumber}`)
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
      setUploading(false)
    } catch (err) {
      console.log(err)
      setUploading(false)
    }
  }

  const handleDelete = async (post) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      )

      if (!confirmDelete) return
      const { data } = await axios.delete(`/delete-post/${post._id}`)
      if (data.ok) {
        toast.error("Post deleted")
        fetchPosts()
      }
    } catch (err) {
      console.error(err)
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
        setCurrPageNumber(1)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleLike = async (likedPostId) => {
    const { data } = await axios.put("/like-post", { _id: likedPostId })
    console.log("liked post ID", likedPostId)
    fetchPosts()
  }

  const handleUnlike = async (unLikedPostId) => {
    const { data } = await axios.put("/unlike-post", { _id: unLikedPostId })
    console.log("unLiked post ID", unLikedPostId)
    fetchPosts()
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
            <PostForm
              handlePostSubmit={handlePostSubmit}
              postContent={postContent}
              setPostContent={setPostContent}
              handleImageUpload={handleImageUpload}
              uploading={uploading}
              image={image}
            ></PostForm>
            <PostList
              handleComment={handleComment}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              posts={posts}
              handleDelete={handleDelete}
            ></PostList>

            <Pagination
              current={currPageNumber}
              total={(totalPosts / 3) * 10}
              onChange={(value) => setCurrPageNumber(value)}
              className='py-5'
            />
          </div>

          <div className='col-md-4' style={{ height: "1vh" }}>
            <SearchBar></SearchBar>

            <br />

            {state && state.user && state.user.following && (
              <Link href={`/user/following`}>
                <a className='h6'>Following {state.user.following.length}</a>
              </Link>
            )}
            <PeopleComponent
              handleFollow={handleFollow}
              people={people}
            ></PeopleComponent>
          </div>
        </div>
        <br />

        <CommentForm
          comment={comment}
          addComment={addComment}
          setComment={setComment}
          visible={visible}
          setVisible={setVisible}
        />
      </div>
    </UserRoute>
  )
}

export default Dashboard
