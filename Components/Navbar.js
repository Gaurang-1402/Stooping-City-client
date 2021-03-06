import { useContext, useEffect, useState } from "react"
import Link from "next/link"
// imported for logout
import { UserContext } from "../Context"
// imported
import { useRouter } from "next/router"
import { Avatar } from "antd"

export const Navbar = () => {
  const [state, setState] = useContext(UserContext)

  // we do this so that we can redirect user to a page post login page
  const router = useRouter()

  const handleLogout = () => {
    // this function exists to logout

    // to logout, we need to clear localStorage
    window.localStorage.removeItem("auth")
    // and set flobal state as null
    setState(null)

    // we send user to login
    router.push("/login")
  }
  // we conditionally render login and register if user is stored

  // now we want to highlight the tab in navbar we are currently on
  // to do this we need the endpoint in the url first

  const [currentTab, setCurrentTab] = useState("")

  useEffect(
    () => {
      // this is how to get the endpoint of the url
      // what is the first part? next.js has both server side and client side methods
      // so we need to check if we are on client right now
      process.browser && setCurrentTab(window.location.pathname)
      // process.browser true if we are in client side
    },
    // these are the dependencies. If either of these change we rerender the page
    [process.browser && window.location.pathname]
  )

  // we use useEffect while component mounts to check for which tab
  // is highlighted

  return (
    <div>
      <nav
        className='nav dark d-flex justify-content-between'
        style={{
          backgroundColor: "#222",
          borderBottom: "5px",
          borderStyle: "solid",
          paddingLeft: "6rem",
          paddingRight: "6rem",
        }}
      >
        <Link href='/'>
          <a
            className={`nav-link text-light ${
              currentTab === "/" ? "background-color: navy;" : ""
            }`}
          >
            <h4>Stooping City</h4>
          </a>
        </Link>

        {state !== null ? (
          <div className='dropdown py-2 justify-content-center align-items-center'>
            <button
              className='btn text-light dropdown-toggle'
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {state &&
                state.user &&
                state.user.firstName + " " + state.user.lastName}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li>
                <Link href='/user/dashboard'>
                  <a
                    className={`nav-link  dropdown-item ${
                      currentTab === "/user/dashboard"
                        ? "current-tab text-dark"
                        : ""
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>

              <li>
                <Link href='/user/profile/update'>
                  <a
                    className={`nav-link  dropdown-item ${
                      currentTab === "/user/profile/update"
                        ? "current-tab text-dark"
                        : ""
                    }`}
                  >
                    Profile
                  </a>
                </Link>
              </li>

              <li>
                <a onClick={handleLogout} className='nav-link '>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            {" "}
            <Link href='/login'>
              <a
                className={`nav-link text-align-center justify-content-center m-auto text-light ${
                  currentTab === "/login" ? "current-tab  text-dark" : ""
                }`}
              >
                Login
              </a>
            </Link>
            <div className='justify-content-center py-2 text-align-center text-light'>
              <Link href='/register'>
                <a
                  className={`nav-link  text-light ${
                    currentTab === "/register" ? "current-tab text-dark" : ""
                  }`}
                >
                  Register
                </a>
              </Link>{" "}
            </div>
          </>
        )}
      </nav>
    </div>
  )
}
