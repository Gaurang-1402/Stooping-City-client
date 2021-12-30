import { useState } from "react"
import axios from "axios"

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("Female")
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secret, setSecret] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await axios.post("http://localhost:8000/api/register", {
        firstName,
        lastName,
        gender,
        age,
        email,
        password,
        secret,
      })
    } catch (err) {
      console.log(err)
    }
  }

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
                          <input
                            className='btn btn-primary btn-lg'
                            type='submit'
                            defaultValue='Submit'
                          />
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
    </div>
  )
}

export default RegisterPage
