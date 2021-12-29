import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from "../Components/Navbar"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='stylesheet' href='styles/styles.css'></link>
      </Head>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
