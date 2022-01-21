import { UserContext } from "../Context"
import { useContext, useEffect, useState } from "react"
import ParallaxBackground from "../Components/Cards/ParallaxBackground"
import Post from "../Components/Cards/Post"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import { ReactSVG } from "react-svg"
import box from "../public/heavy_box.svg"
import relax from "../public/relaxing.svg"
import Image from "next/image"
// npm i socket.io-client
// import io from "socket.io-client"

// const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
//   reconnection: true,
// })

// accept props as an argument to use the props from getServerSideProps
// const Home = ({ posts }) => {
const Home = () => {
  // we have access to global state using this piece of code
  const [state, setState] = useContext(UserContext)

  const [feed, setFeed] = useState([])

  const head = () => (
    <Head>
      <title>Finditure</title>
      <meta name='description' content='A website to find furniture' />
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

  const collection = []
  return (
    <>
      {head()}

      <div className='container dark' style={{ height: "100vh" }}>
        <div className='row pt-5'>
          <div className='col-md-6'>
            <h1 className='mb-2' style={{ fontSize: "100px" }}>
              Stooping
            </h1>
            <h1 style={{ fontSize: "100px" }}>City</h1>

            <h2>One person’s trash is another person’s treasure</h2>
            <h4 className='mb-5'>
              Inspired by{" "}
              <a href='https://www.instagram.com/stoopingnyc/?hl=en'>
                Stooping NYC
              </a>
            </h4>

            <h5>How does it work?</h5>
            <h6 style={{ fontWeight: "normal" }}>
              Browse the posts to see what items are available near you and
              stoop them up.
            </h6>

            <h6 style={{ fontWeight: "normal" }}>
              In case you have items you no longer need, post a picture,
              description and the address of the item!
            </h6>

            <div className='btn mt-5'>
              <Link href='/user/dashboard '>
                <a>
                  <div>Start stooping</div>
                </a>
              </Link>
            </div>
          </div>
          <div className='col-md-6'>
            {/* <ReactSVG src='../public/heavy.png' /> */}
            <Image
              className='mb-1'
              src={box}
              alt='Man moving out'
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps() {
//   const { data } = await axios.get("/home-posts")
//   return {
//     props: {
//       posts: data,
//     },
//   }
// }

export default Home
