import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function SignUpForm({onSignIn}) {
  const defaultForm = {
    username:"",
    password:"",
    password_confirmation:"",
    age:"",
    occupation:"",
    interest:""

  }

  const [formData, setFormData]=useState(defaultForm)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();


  function handleChange(e){
    const key = e.target.name
    const value = key === "age" ? parseInt(e.target.value): e.target.value
    setFormData({
      ...formData,
      [key]:value
    })
}

function handleSubmit(e){
  e.preventDefault()
  fetch('/signup',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
  })
  .then(r=>{
      if(r.ok)
          {r.json().then((user)=>{onSignIn(user)
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
          <h1>Na-Grow</h1>
          <h3>Create your Na-Grow account</h3>
          <label>username: </label>
          <input type="text" name="username" value={formData.username} onChange={handleChange}/>
          <label>password: </label>
          <input type="text" name="password" value={formData.password} onChange={handleChange}/>
          <label>password confirmation: </label>
          <input type="text" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}/>
          <label>age: </label>
          <input type="integer" name="age" value={formData.age} onChange={handleChange}/>
          <label>occupation: </label>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange}/>
          <label>interest: </label>
          <textarea type="text" name="interest" value={formData.interest} onChange={handleChange}/>
          <button type="submit">Submit</button>
        </form>
        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}
      
    </div>
  )
}

export default SignUpForm
