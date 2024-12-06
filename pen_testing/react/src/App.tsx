import { Turnstile } from '@marsidev/react-turnstile'

import './App.css'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState<string>("")

  return (
    <>
      <input placeholder='OTP'></input>
      <input placeholder='New password'></input>
{/* Turnstile: A widget for verifying that users are human. */}
{/* In the Code: */}
{/* The user enters OTP and new password. */}
{/* The Turnstile widget appears to validate that the user is a human. */}
{/* On successful completion of the Turnstile challenge, a token is saved. */}
{/* Clicking the "Update password" button sends a request to the server with the email, OTP, and Turnstile token to update the password. */}
      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAXtEe2JIeAEUcjX' />

      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", { 
          email: "harkirat@gmail.com",
          otp: "123456",
          token: token,
        })
      }}>Update password</button>
    </>
  )
}

export default App