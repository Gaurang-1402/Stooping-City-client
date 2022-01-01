import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from "../Components/Navbar"
import Head from "next/head"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "antd/dist/antd.css"
// this import is for context api
import { UserProvider } from "../Context"

import "../public/styles/styles.css"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel='stylesheet' href='styles/styles.css'></link>
      </Head>
      <Navbar></Navbar>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
