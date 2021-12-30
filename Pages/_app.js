import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from "../Components/Navbar"
import Head from "next/head"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "antd/dist/antd.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='stylesheet' href='styles/styles.css'></link>
      </Head>
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
