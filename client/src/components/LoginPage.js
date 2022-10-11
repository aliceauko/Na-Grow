import React from 'react'
import {useState} from 'react'
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

function LoginPage({onSignIn}) {
  const [hasAccount, setHasAccount] = useState(true)
  return (
    hasAccount ? (
      <div>
      <SignInForm onSignIn={onSignIn}/>
      <h4>New to Na-Grow?</h4>
      <button onClick={()=>setHasAccount(false)}>Join now!</button>
  </div>
  ): (
  <div>
      <SignUpForm onSignIn={onSignIn}/>
      <h4>Already have an account?</h4>
      <button onClick={()=>setHasAccount(+true)}>Log in</button>
  </div> 

    
  )
  )
}

export default LoginPage
