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

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("Female")
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`/register`, {
        firstName,
        lastName,
        gender,
        age,
        email,
        password,
        confirmPassword,
        secret,
      })

      if (data.success) {
        setLastName("")
        setFirstName("")
        setGender("Female")
        setEmail("")
        setConfirmPassword("")
        setPassword("")
        setLoading(false)
        setOk(data.ok)
      }
      if (data.error) {
        setLoading(false)
        toast.error(data.error)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err)
    }
  }

  // this is done so that if the user types "/login" in website bar
  // even after you have logged in you redirect to home
  if (state && state.token) router.push("/")

  return (
    <div className='container dark'>
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
                        Nice to have you onboard! Enter your details to register
                      </h3>
                      <form onSubmit={handleSubmit}>
                        <div className='row'>
                          <div className='col-md-6 mb-4'>
                            <div className='form-outline'>
                              <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type='text'
                                id='firstName'
                                className='form-control form-control-lg'
                              />
                              <label className='form-label' htmlFor='firstName'>
                                First Name
                              </label>
                            </div>
                          </div>
                          <div className='col-md-6 mb-4'>
                            <div className='form-outline'>
                              <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type='text'
                                id='lastName'
                                className='form-control form-control-lg'
                              />
                              <label className='form-label' htmlFor='lastName'>
                                Last Name
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6 mb-4 d-flex align-items-center'>
                            <div className='form-outline datepicker w-100'>
                              <input
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                                type='number'
                                className='form-control form-control-lg'
                                id='birthdayDate'
                              />
                              <label htmlFor='age' className='form-label'>
                                Age
                              </label>
                            </div>
                          </div>
                          <div className='col-md-6 mb-4'>
                            <h6 className='mb-2 pb-1'>Gender: </h6>
                            <div className='form-check form-check-inline'>
                              <input
                                onChange={(e) => setGender("Female")}
                                className='form-check-input'
                                type='radio'
                                name='inlineRadioOptions'
                                id='femaleGender'
                                defaultValue='option1'
                                defaultChecked
                              />
                              <label
                                className='form-check-label'
                                htmlFor='femaleGender'
                              >
                                Female
                              </label>
                            </div>
                            <div className='form-check form-check-inline'>
                              <input
                                onChange={(e) => setGender("Male")}
                                className='form-check-input'
                                type='radio'
                                name='inlineRadioOptions'
                                id='maleGender'
                                defaultValue='option2'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='maleGender'
                              >
                                Male
                              </label>
                            </div>
                            <div className='form-check form-check-inline'>
                              <input
                                onChange={(e) => setGender("Other")}
                                className='form-check-input'
                                type='radio'
                                name='inlineRadioOptions'
                                id='otherGender'
                                defaultValue='option3'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='otherGender'
                              >
                                Other
                              </label>
                            </div>
                          </div>
                        </div>
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
                          <div className='col-md-6 mb-4 pb-2'>
                            <div className='form-outline'>
                              <input
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                type='password'
                                id='password'
                                className='form-control form-control-lg'
                              />
                              <label className='form-label' htmlFor='password'>
                                Confirm Password
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
                            <small className='form-text text-muted'>
                              You can use this to reset your password if
                              forgotten
                            </small>
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
                        >
                          <div className='col'>
                            Already have an account?{" "}
                            <Link href='/login'>
                              <a className=''> Login</a>
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
            title='Registration Successful'
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Now you can login with your email and password. Let's do it</p>
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
