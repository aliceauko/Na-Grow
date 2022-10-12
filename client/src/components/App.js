
import React, {useEffect, useState} from "react";
import {Route, Routes} from 'react-router-dom'
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";
import NewPlant from "./NewPlant";
import MyList from "./MyList";
import Home from "./Home";
 
function App() {
  const [user, setUser] = useState(null)
  const [types, setTypes] = useState([])
  const [plants, setPlants] = useState([])

  useEffect(()=>{
    fetch("/me")
    .then((r)=>{
      if(r.ok){r.json().then((user)=>setUser(user))}
    })
  }, [])



  useEffect(()=>{
    fetch("/types")
    .then((r)=>{
      if(r.ok){r.json().then((type)=>setTypes(type))}
    })
  }, [])

  useEffect(()=>{
    fetch("/plants")
    .then((r)=>{
      if(r.ok){r.json().then((plants)=>setPlants(plants))}
    })
  }, [])

    
  function handleDeletePlant(id) {
    const updatedPlants = plants.filter((plant) => plant.id !== id)
    setPlants(updatedPlants)
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
        if (plant.id === updatedPlant.id) {
        return updatedPlant;
        } else {
        return plant;
        }
    });
    setPlants(updatedPlants)
}

return (
    (<div>
      <NavBar setUser={setUser} user={user}/>
      <Routes>
        <Route path="/new" element= {<NewPlant user={user} plants={plants} onChangePlants={setPlants} types={types}/>}/>
        <Route path="/mylist" element= {<MyList user={user} plants={plants} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant}/>}/>
        <Route path="/login" element= {user?<h1>Welcome! {user.username}</h1>:<LoginPage onSignIn={setUser}/>}/>
        <Route path="/" element= {<Home plants={plants} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant} types={types}/>}/>
      </Routes>
  </div>)
   
  );
}

export default App;