import React from 'react'
import {Link, Route, useRouteMatch, Switch} from "react-router-dom"
import PlantList from './PlantList'

function Home({plants, onDeletePlant, onUpdatePlant, types}) {

    const typeList = types.map(({id, name}) => (
        <li key={id}>
            <Link to={`/types/plants/${id}`}>{name}</Link>
        </li>
        ));

    let {path} = useRouteMatch()

  return (
    <div  display="flex">
            <ul>{typeList}</ul>
            
            <Switch>
                <Route exact path={path}>
                    <PlantList 
                        plants={plants} 
                        onDeletePlant={onDeletePlant}
                        onUpdatePlant={onUpdatePlant}
                        edit={false}
                    />
                </Route>
                <Route path={`/types/plants/:typeId`}>
                    <PlantListList 
                        plants={plants} 
                        onDeletePlant={onDeletePlant}
                        onUpdatePlant={onUpdatePlant}
                        edit={false}
                    />
                </Route>
            </Switch>
        </div>
  )
}

export default Home
