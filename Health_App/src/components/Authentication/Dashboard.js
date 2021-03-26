import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from "firebase/app"
import 'firebase/storage'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [imageAsUrl, setImageAsUrl] = useState(0);

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function getProfilePicture() {
    await firebase.storage().ref('images').child(currentUser.email).getDownloadURL()
       .then(fireBaseUrl => {
        //  setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
         setImageAsUrl(fireBaseUrl);
       })

  }

  useEffect(() => {
    getProfilePicture();
}, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <img src={imageAsUrl} width="100" height="100"></img>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          {currentUser ? <strong>Email: {currentUser.email}</strong> : <strong>Email:</strong> }
          
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}