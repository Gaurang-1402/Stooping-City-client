import { useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "antd"
import Link from "next/link"
import { Spin } from "antd"
import { UserContext } from "../Context"
import { useRouter } from "next/router"

const RegisterPage = () => {
  const router = useRouter()

  const [state, setState] = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        confirmNewPassword,
        secret,
      })

      console.log("forgot password endpoint data => ", data)

      if (data.success) {
        setEmail("")
        setNewPassword("")
        setNewConfirmPassword("")
        setSecret("")
        setOk(true)
        setLoading(false)
      }
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  // this is done so that if the user types "/login" in website bar
  // even after you have logged in you redirect to home
  if (state && state.token) router.push("/")

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <section className='vh-100 gradient-custom'>
            <div className='container py-5 h-100'>
              <div className='row justify-content-center align-items-center h-100'>
                <div className='col-12 col-lg-9 col-xl-7'>
                  <div
                    className='card shadow-2-strong card-registration'
                    style={{ borderRadius: 15 }}
                  >
                    <div className='card-body p-4 p-md-5'>
                      <h3 className='mb-4 pb-2 pb-md-0 mb-md-5'>
                        Forgot Password
                      </h3>
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

                          <div className='col-md-6 mb-4 pb-2'>
                            <div className='form-outline'>
                              <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type='password'
                                id='password'
                                className='form-control form-control-lg'
                              />
                              <label className='form-label' htmlFor='password'>
                                Enter your new password
                              </label>
                            </div>
                          </div>
                          <div className='col-md-6 mb-4 pb-2'>
                            <div className='form-outline'>
                              <input
                                value={confirmNewPassword}
                                onChange={(e) =>
                                  setConfirmNewPassword(e.target.value)
                                }
                                type='password'
                                id='password'
                                className='form-control form-control-lg'
                              />
                              <label className='form-label' htmlFor='password'>
                                Confirm your new password
                              </label>
                            </div>
                          </div>

                          <div className='col-md-6 mb-4 pb-2'>
                            <div className='form-outline'>
                              <select className='form-control'>
                                <option className='form-text text-muted-control'>
                                  What is your favorite color?
                                </option>

                                <option className='form-text text-muted-control'>
                                  What is your best friend's name?
                                </option>

                                <option className='form-text text-muted-control'>
                                  What city were you born in?
                                </option>
                              </select>

                              <label
                                className='form-label'
                                htmlFor='phoneNumber'
                              >
                                Pick a question
                              </label>
                            </div>
                          </div>

                          <div className='col-md-6 mb-4 pb-2'>
                            <div className='form-outline'>
                              <input
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                className='form-control form-control-lg'
                              />
                              <label className='form-label'>
                                Enter your answer
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className='mt-4 pt-2'>
                          <button
                            className='btn btn-primary btn-lg'
                            type='submit'
                            defaultValue='Submit'
                          >
                            {loading ? <Spin></Spin> : "SUBMIT"}
                          </button>
                        </div>
                        <div
                          className='
                        '
                        ></div>
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
            title='Password changed successfully.'
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p> Please login with your new password.</p>
            <Link href='/login'>
              <a className='btn btn-primary'> Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
