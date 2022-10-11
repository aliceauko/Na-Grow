import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function SignInForm({onSignIn}) {

  const defaultForm = {    
    username:"",
    password:""
  }

  const [formData, setFormData]=useState(defaultForm)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  function handleChange(e){
    const key = e.target.name
    setFormData({
      ...formData,
      [key]:e.target.value
    })
}

function handleSubmit(e){
  e.preventDefault()
  fetch('/login',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
  })
  .then(r=>{
      if(r.ok)
          {r.json().then((user)=>{
            onSignIn(user)
            navigate("/mylist");
            setFormData(defaultForm)
          })}
      else
          {r.json().then((e)=>setErrors(e.errors))}
      })
}
  return (
    <div>
       <form className="Login" onSubmit={handleSubmit}>
          <h1>Na-grow</h1>
          <h3>Log in to your account</h3>
          <label>username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange}/>
          <label>password:</label>
          <input type="text" name="password" value={formData.password} onChange={handleChange}/>
          <button type="submit">Submit</button>
        </form>
        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}

      
    </div>
  )
}

export default SignInForm
