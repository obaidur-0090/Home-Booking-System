import { useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase.init'
import { AuthContext } from './AuthContext'

const googleProvider = new GoogleAuthProvider()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(Boolean(auth))

  useEffect(() => {
    if (!auth) return undefined

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    }, (error) => {
      console.error('Firebase authentication state could not be read:', error)
      setLoading(false)
    })
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isFirebaseConfigured,
    register: async (name, email, password) => {
      if (!auth) throw new Error('Add your Firebase settings to .env to enable authentication.')
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: name })
      setUser(credential.user)
      return credential.user
    },
    login: async (email, password) => {
      if (!auth) throw new Error('Add your Firebase settings to .env to enable authentication.')
      const credential = await signInWithEmailAndPassword(auth, email, password)
      return credential.user
    },
    loginWithGoogle: async () => {
      if (!auth) throw new Error('Add your Firebase settings to .env to enable authentication.')
      const credential = await signInWithPopup(auth, googleProvider)
      return credential.user
    },
    logout: async () => {
      if (!auth) return
      await signOut(auth)
    },
  }), [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
