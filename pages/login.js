import { useState, useContext } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "antd"
import Link from "next/link"
import { Spin } from "antd"
import { UserContext } from "../Context"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ok, setOk] = useState("")

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [state, setState] = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      })
      // Once you have successfully logged in and request goes through
      // you redirect to homepage
      // router.push("/")
      // console.log(data)

      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      }

      if (data.success) {
        // we have the data from the backend
        // we now need to save in global state using context API
        setState({ user: data.user, token: data.token })

        // but once we refresh page, we lose access to everything in
        // global state
        // to solve, we save in local storage
        // window.localStorage.setItem(<key>, <value has to be in json>) is the function call
        window.localStorage.setItem("auth", JSON.stringify(data))

        router.push("/user/dashboard")
        setEmail("")
        setOk(false)
        setPassword("")
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  if (state && state.token) router.push("/user/dashboard")

  return (
    <div className='dark container'>
      <div className='row'>
        <div className='col'>
          <section className='vh-100 gradient-custom'>
            <div className='container py-5 h-100'>
              <div className='row justify-content-center align-items-center h-100'>
                <div className='col-12 col-lg-9 col-xl-7'>
                  <div
                    className='card shadow-2-strong card-registration'
                    style={{ borderRadius: " 5px" }}
                  >
                    <div className='card-body p-4 p-md-5'>
                      <h2 className='mb-4 pb-2 pb-md-0 mb-md-5'>
                        Welcome back!
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <div className='row'>
                          <div className='col-md-6 mb-4 pb-2'>
                            <div className='form-outline'>
                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                id='emailAddress'
                                className='form-control form-control-lg'
                              />
                              <label
                                className='form-label'
                                htmlFor='emailAddress'
                              >
                                Email
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6 mb-4 pb-2'>
                          <div className='form-outline'>
                            <input
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type='password'
                              id='password'
                              className='form-control form-control-lg'
                            />
                            <label className='form-label' htmlFor='password'>
                              Password
                            </label>
                          </div>
                        </div>
                        <div className='mt-4 pt-2'>
                          <button
                            className='btn btn-primary btn-lg'
                            type='submit'
                            defaultValue='Login'
                            // style={{
                            //   backgroundColor: "#ffcc00",
                            //   color: "black",
                            // }}
                          >
                            {loading ? <Spin className='dark'></Spin> : "Login"}
                          </button>
                        </div>
                        <div
                          className='
                        '
                        >
                          <div className='col py-3'>
                            First time here?{" "}
                            <Link href='/register'>
                              <a className=''> Register</a>
                            </Link>
                          </div>

                          <div className='col'>
                            <Link href='/forgot-password'>
                              <a className='text-danger'> Forgot Password?</a>
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Modal
            title='Login Successful'
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          ></Modal>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
