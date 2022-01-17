import { UserContext } from "../Context"
import { useContext, useEffect, useState } from "react"
import ParallaxBackground from "../Components/Cards/ParallaxBackground"
import Post from "../Components/Cards/Post"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
// npm i socket.io-client
import io from "socket.io-client"

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
})

// accept props as an argument to use the props from getServerSideProps
const Home = ({ posts }) => {
  // we have access to global state using this piece of code
  const [state, setState] = useContext(UserContext)

  const [feed, setFeed] = useState([])

  useEffect(() => {
    // console.log("Socket join", socket)

    socket.on("new-post", (newPost) => {
      setFeed([newPost, ...feed])
    })
  }, [])
  const head = () => (
    <Head>
      <title>Wise - A social network by devs for devs</title>
      <meta
        name='description'
        content='A social network by developers for other web developers'
      />
      <meta
        property='og:description'
        content='A social network by developers for other web developers'
      />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Wise' />
      <meta property='og:url' content='http://merncamp.com' />
      <meta
        property='og:image:secure_url'
        content='http://merncamp.com/images/default.jpg'
      />
    </Head>
  )

  const collection = feed.length > 0 ? feed : posts
  return (
    <>
      {head()}
      <ParallaxBackground url='/images/default.jpg'> WISE</ParallaxBackground>
      <div className='container'>
        <div className='row pt-5'>
          {collection.map((post) => (
            <div key={post._id} className='col-md-4'>
              <Link href={`/post/view/${post._id}`}>
                <a style={{ color: "inherit" }}>
                  <Post post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get("/home-posts")
  return {
    props: {
      posts: data,
    },
  }
}

export default Home
