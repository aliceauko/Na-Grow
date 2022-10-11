import React from 'react'
import PlantList from './PlantList'

function MyList({user, plants, onDeletePlant, onUpdatePlant}) {
    
  const displayPlants = !user? null : plants.filter((plant) => plant.user_id===user.id)
  return (
    !user? <h1>Please log in to see your plant list!</h1> :
    <PlantList
        plants={displayPlants} 
        onDeletePlant={onDeletePlant}
        onUpdatePlant={onUpdatePlant}
        edit={true}
    />
  
  )
}

export default MyList
