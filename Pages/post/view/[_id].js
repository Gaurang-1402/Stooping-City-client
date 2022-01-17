// import { UserContext } from "../Context"
// import { useContext } from "react"
import ParallaxBackground from "../../../Components/Cards/ParallaxBackground"
import Post from "../../../Components/Cards/Post"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
// accept props as an argument to use the props from getServerSideProps
const ViewPost = ({ post }) => {
  const head = () => (
    <Head>
      <title>MERNCAMP - A social network by devs for devs</title>
      <meta name='description' content={post.content} />
      <meta
        property='og:description'
        content='A social network by developers for other web developers'
      />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='MERNCAMP' />
      <meta
        property='og:url'
        content={`http://merncamp.com/post/view/${post._id}`}
      />
      <meta property='og:image:secure_url' content={imageSource(post)} />
    </Head>
  )
  const imageSource = (post) => {
    if (post.image) {
      return post.image.url
    } else {
      return "/images/default.jpg"
    }
  }
  return (
    <>
      {head()}
      <ParallaxBackground url='/images/default.jpg'> WISE</ParallaxBackground>
      <div className='container'>
        <div className='row pt-5'>
          <div className='col-md-8 offset-md-2'>
            <Link href={`/post/${post._id}`}>
              <a style={{ color: "inherit" }}>
                <Post key={post._id} post={post} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  console.log("from frontend => ", ctx.params._id)
  const { data } = await axios.get(`/post/${ctx.params._id}`)
  return {
    props: {
      post: data,
    },
  }
}

export default ViewPost
