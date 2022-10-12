import React from 'react'
import {Link, Route, useMatch, Routes} from "react-router-dom"
import PlantList from './PlantList'

function Home({plants, onDeletePlant, onUpdatePlant, types}) {

    const typeList = types.map(({id, name}) => (
        <li key={id}>
            <Link to={`/types/plants/${id}`}>{name}</Link>
        </li>
        ));

    let {path} = useMatch('');

  return (
    <div  display="flex">
            <ul>{typeList}</ul>
            
            <Routes>
                <Route exact path={path} element= {<PlantList 
                        plants={plants} 
                        onDeletePlant={onDeletePlant}
                        onUpdatePlant={onUpdatePlant}
                        edit={false}
                    />}/>
                <Route path={`/types/plants/:typeId`} element= {<PlantList
                        plants={plants} 
                        onDeletePlant={onDeletePlant}
                        onUpdatePlant={onUpdatePlant}
                        edit={false}
                    />}/>
            </Routes>
        </div>
  )
}

export default Home
