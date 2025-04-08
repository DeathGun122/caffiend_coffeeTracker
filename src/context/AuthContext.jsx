import { useState, useEffect, useContext, createContext} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { auth, db } from "../../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider(props) {
    const {children} = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }
    
    function logout() {
        setGlobalUser(null)
        setGlobalData(null)
        return signOut()
    }
    
    const value = {globalUser, globalData, setGlobalData, isLoading, signup, login, logout, resetPassword}

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            console.log('Current user', user)
            setGlobalUser(user)
            if(!user) {
                console.log('User not found')
                return
            }
            try{
                setIsLoading(true)
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if(docSnap.exists()) {
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                }
                setGlobalData(firebaseData)
            }catch(err) {
                console.log(err.message)
            }finally {
                setIsLoading(false)
            }

        })
        return unsubscribe
    }, [])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}