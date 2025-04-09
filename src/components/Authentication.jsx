import { useState } from "react"
import { useAuth } from "../context/AuthContext"
export default function Authentication(props) {
    const {handleCloseModal} = props
    const [isRegisteration, setIsRegisteration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    const {signup, login} = useAuth()
    async function handleAuthenticate() {
        if(!email || !password || !email.indexOf('@')|| password.length < 6|| isAuthenticating) return
        try{
            setIsAuthenticating(true)
            setError(null)
            if(isRegisteration){
                await signup(email, password)
            }
            else{
                await login(email, password)
            }
            handleCloseModal()
        }catch(err){
            console.log(err.message)
            setError(err.message)
        }finally{
            setIsAuthenticating(false)
        }
    }

    return (
        <>
            <h2 className="sign-up-text">{isRegisteration ? "Sign Up" : 'Log In'}</h2>
            <p>{isRegisteration? 'Create a new account!' : 'Sign in to your account!'}</p>
            {error && (
                <p className="error">X {error}</p>
            )}
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />  
            <input  value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="********" type="password" />
            <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegisteration? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => {setIsRegisteration(!isRegisteration)}}><p>{isRegisteration ? 'Sign In' : 'Sign Up'}</p></button>
            </div>
        </>
    )
}