import React from "react"
import { useRouter } from "next/router"

const editPost = () => {
  const router = useRouter()

  // router has a property called query that you can use to
  // get the endpoint of the url
  const _id = router.query.id
  console.log(router)
  return <div>This is the ID: {_id}</div>
}

export default editPost
