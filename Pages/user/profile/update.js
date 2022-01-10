import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "antd"

import { Spin } from "antd"
import { UserContext } from "../../../Context"
import { useRouter } from "next/router"
import { Avatar } from "antd"
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons"

const UpdatePage = () => {
  const router = useRouter()

  const [state, setState] = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [about, setAbout] = useState("")
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
  // image
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.put(`/profile-update`, {
        firstName,
        lastName,
        gender,
        age,
        username,
        password,
        confirmPassword,
        secret,
        image,
      })

      //   console.log("the data we got back => ", data)

      if (data.error) {
        setLoading(false)
        toast.error(data.error)

        return
      } else {
        // update local storage, update user, update toke
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data
        localStorage.setItem("auth", JSON.stringify(auth))
        // update context
        setState({ ...state, user: data })
        setLoading(false)
        setOk(true)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err)
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
      // console.log("uploaded image => ", data)
      setUploading(false)
    } catch (err) {
      console.log(err)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username)
      setEmail(state.user.email)
      setFirstName(state.user.firstName)
      setLastName(state.user.lastName)
      setGender(state.user.gender)
      setAge(state.user.age)
      setAbout(state.user.about)
      setImage(state.user.image)
    }
  }, [state && state.user])
  return (
    <>
      <div className='container-fluid'>
        <div className='row py-5 text-light bg-default-image'>
          <div className='col text-center'>
            <h1>Profile</h1>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col'>
            <section className='vh-200 gradient-custom'>
              <div className='container py-5 h-100'>
                <div className='row justify-content-center align-items-center h-100'>
                  <div className='col-12 col-lg-9 col-xl-7'>
                    <div
                      className='card shadow-2-strong card-registration'
                      style={{ borderRadius: 15 }}
                    >
                      <div className='d-flex justify-content-center h1'>
                        <label>
                          {image && image.url ? (
                            <Avatar
                              size={90}
                              src={image.url}
                              className='mt-4'
                            ></Avatar>
                          ) : uploading ? (
                            <LoadingOutlined className='mt-2'></LoadingOutlined>
                          ) : (
                            <CameraOutlined className='mt-2'></CameraOutlined>
                          )}

                          <input
                            onChange={handleImageUpload}
                            type='file'
                            accept='images/*'
                            hidden
                          />
                        </label>
                      </div>
                      <div className='card-body p-4 p-md-5'>
                        <form onSubmit={handleSubmit}>
                          <div className='row'>
                            <div className='col-md-6 mb-4'>
                              <div className='form-outline'>
                                <input
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  type='text'
                                  id='username'
                                  className='form-control form-control-lg'
                                />
                                <label
                                  className='form-label'
                                  htmlFor='username'
                                >
                                  Username
                                </label>
                              </div>
                            </div>
                            <div className='col-md-6 mb-4'>
                              <div className='form-outline'>
                                <input
                                  value={about}
                                  onChange={(e) => setAbout(e.target.value)}
                                  type='text'
                                  id='about'
                                  className='form-control form-control-lg'
                                />
                                <label className='form-label' htmlFor='about'>
                                  About
                                </label>
                              </div>
                            </div>
                            <div className='col-md-6 mb-4'>
                              <div className='form-outline'>
                                <input
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  type='text'
                                  id='firstName'
                                  className='form-control form-control-lg'
                                />
                                <label
                                  className='form-label'
                                  htmlFor='firstName'
                                >
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
                                <label
                                  className='form-label'
                                  htmlFor='lastName'
                                >
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
                                  disabled={true}
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
                                <label
                                  className='form-label'
                                  htmlFor='password'
                                >
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
                                <label
                                  className='form-label'
                                  htmlFor='password'
                                >
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
              title='Your profile has been updated successfully!'
              visible={ok}
              onCancel={() => setOk(false)}
              footer={null}
            ></Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePage
