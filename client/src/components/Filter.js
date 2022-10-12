import React from "react";

function Filter({ types, onChangeId }) {

  function handleFilter(e) {
    onChangeId(types.filter(type=>type.name===(e.target.value))[0].id);
  }
  return (
    <div>
      <label>Choose a plant type: </label>
      <select name="type_id" onChange={handleFilter}>
        
        <option value="Flowering">Flowering</option>
        <option value="Low-light">Low-light</option>
        <option value="Air-purifying">Air-purifying</option>
        <option value="Trailing">Trailing</option>
        <option value="Succulents and cacti">Succulents and cacti</option>
      </select>
    </div>
  );
}

export default Filter;
