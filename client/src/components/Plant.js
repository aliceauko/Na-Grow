import React, {useState} from 'react'

const style = {
    display: "inline-block",
    width: "500px",
    padding: "20px",
    margin: "0 10px 10px",
    color: "black",
    fontSize: "20px",
    boxSizing: "border-box"
};


function Plant({plant, onDeletePlant, onUpdatePlant, edit}) {
    const {name, image_url, description, user} = plant
    const [isUpdating, setIsUpdating] = useState(false);
    const [detail, setDetail] = useState(false);
    const [error, setError] = useState([])
    const defaultForm = {    
        name: name,
        image_url: image_url,
        description: description
      }
    
    const [formData, setFormData]=useState(defaultForm)

    function handleChange(e){
        const key = e.target.name
        const value = = (key === "name" || key === "image_url") ? e.target.value : parseInt(e.target.value)
        setFormData({
          ...formData,
          [key]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/plants/${plant.id}`,{
          method:"PATCH",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(formData)
        })
        .then(r=>{
          if(r.ok){
              r.json().then((a)=>{
                  onUpdatePlant(a)
                  setIsUpdating(false)
                })
          }else{r.json().then((e)=>setError(e.error))}
        })
    }

    function handleDelete(id){
        fetch(`/plants/${id}`,{
            method:"DELETE"
        })
        .then(()=>onDeletePlant(id))
      }

      function handleDetail(id){
        fetch(`/plants/${id}`)
          .then(r=>{
            if(r.ok){
                r.json().then((a)=>{
                    setDetail(!detail)
                  })
            }else{r.json().then((e)=>setError(e.error))}
          })
    }

  return (
    <div style={style}>
        {isUpdating?
        (<form className="UpdateItem" onSubmit={handleSubmit} >
        <label>name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}/>
        <label>image url:</label>
        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange}/>
        <label>description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange}/>
        <button type="submit">Save</button>
    </form> ):
    (<div>
        <h2>{name}</h2>
        {edit?<p>description: {description}</p>:null}
        <img src={image_url} alt="plant" style={style}/>
    </div>)};

    {edit?<button id='update' onClick={() => setIsUpdating((isUpdating) => !isUpdating)}>update</button>:null}
            {edit?<button id='delete' onClick={e=>handleDelete(plant.id)}>delete</button>:null}
            {edit?null:<button id='detail' onClick={e=>handleDetail(plant.id)}>See detail</button>}
            {detail?<div>
                        <p>Description of plant care: {description}</p>
                        <p>roommate age: {user.age}</p>
                        <p>roommate occupation: {user.occupation}</p>
                        <p>roommate interest: {user.interest}</p>
                    </div>:(<p>{error}</p>)
            }    


      
    </div>
  )
}

export default Plant
