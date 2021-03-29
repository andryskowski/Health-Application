import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app"
import "firebase/auth"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateProfilePhoto, updateUsername } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [file, setFile] = useState(false)
  const [userName, setUsername] = useState(0)
  const usernameRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (file) {
      promises.push(updateProfilePhoto(file));
    }
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    if (usernameRef.current.value) {
      promises.push(updateUsername(usernameRef.current.value))
    }


    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  let fileUploaded = {};

  function chooseFile(e) {
    fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  }

  function changeUsername(e) {
    const newUsername = e.target.value;
    setUsername(newUsername);
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />

              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  ref={usernameRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
            </Form.Group>



            Upload your profile picture
             <div className="field" className="mt-1 mb-1">
              <input type='file' onChange={chooseFile} />
            </div>

            {file
              ?
              <img src={URL.createObjectURL(file)} className="mt-1 mb-1" width="100" height="100"></img>
              :
              file
            }
            {/* <img src={URL.createObjectURL(file) } className="mt-1 mb-1" width="100" height="100"></img> */}

            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}