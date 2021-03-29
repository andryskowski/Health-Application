import React, { useContext, useState, useEffect } from "react"

import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

import { auth } from "../firebase"


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateProfilePhoto(file) {
    firebase.storage().ref(`/images/${currentUser.email}`).put(file);
  }

  function setProfileUsername(newUsername) {
    const idUser = currentUser.uid;
    const userNameObj = {userName : newUsername};
    console.log(userNameObj)
    firebase.firestore()
      .collection("users")
      .doc(currentUser.uid)
      .set(userNameObj)
      .catch((error) => console.error("Error: ", error));
      
  }

  function getProfileUsername() {
    return firebase.firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then(doc => console.log(doc.data().userName))
      .catch((error) => console.error("Error: ", error))
      
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfilePhoto
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}