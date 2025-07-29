import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login User
  const logInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  //  Logout User
  const logOutUser = () => {
    return signOut(auth)
  }
  

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [user])

  const authData = {
    user,
    setUser,
    createUser,
    logInUser,
    logOutUser,
    loading,
    setLoading
  }

  return <AuthContext value={authData}>
    {children}
  </AuthContext>
};

export default AuthProvider;