import React from 'react';
import {useParams} from 'react-router-dom'
import Plant from './Plant';

function PlantList({plants, onDeletePlant, onUpdatePLant, edit}) {
    const {typeId} =useParams()
    let displayPlants
    if(typeId)
    {displayPlants=plants.filter(a=>a.type_id===parseInt(typeId))}
    else
    {displayPlants=plants}

  return (
    displayPlants.length === 0 ? "No plant available yet" :
    displayPlants.map((plant) =>
    (<Plant
    plant={plant}
    key={plant.id}
    onDeletePlant={onDeletePlant}
    onUpdatePlant={onUpdatePLant}
    edit={edit}
    />))
    
  )
}

export default PlantList
