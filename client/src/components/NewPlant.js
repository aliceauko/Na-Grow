import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Filter from './Filter';

const style = {
    backgroundImage: 
"url('https://previews.123rf.com/images/milkos/milkos1903/milkos190301744/119497167-home-plants-in-flowerpots-composition-at-white-brick-wall-background-minimalistic-decor-concept-copy.jpg')",
  height:'500px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  };



function NewPlant({user, plants, onChangePlants, types}) {
    const defaultForm = {    
        name:"",
        description:"",
        image_url:""
      }
    const [formData, setFormData]=useState(defaultForm)
    const [typeId, setTypeId]=useState(1)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();


    function handleAddPlant(newPlant) {
        onChangePlants([...plants, newPlant])
    }


    function handleChange(e){
        const key = e.target.name
        const value = (key === "name" || key === "description" || key === "image_url" ) ? e.target.value : parseInt(e.target.value)
        setFormData({
          ...formData,
          [key]:value,
          type_id:typeId
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/plants',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(formData)
        })
        .then(r=>{
          if(r.ok){
              r.json().then((a)=>handleAddPlant(a))
              navigate("/mylist");
          }else{r.json().then((e)=>setErrors(e.errors))}
        })
    }



    

  return (
    !user?<h1>Please log in to post your plant!</h1>:
    <div style={style} >
      <h3>Share some plant information</h3>
      <Filter onChangeId={setTypeId} types={types}/>
      <form className="NewItem" onSubmit={handleSubmit} style={style}>
        <label>name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}/>
        <label>description:</label>
        <textarea type="text" name="description" value={formData.description} onChange={handleChange}/>
        <label>image url:</label>
        <textarea type="text" name="image_url" value={formData.image_url} onChange={handleChange}/>
        <button  className ="btn"type="submit">Save</button>
      </form>
      {errors.map((err) => (
              <p key={err}>{err}</p>
      ))}
    </div>
  )
}

export default NewPlant