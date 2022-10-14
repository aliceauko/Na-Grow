import React, { useState } from "react";

const style = {
  color: "black",
  fontSize: "20px",
  boxSizing: "border-box",
};

function Plant({ plant, onDeletePlant, onUpdatePlant, edit }) {
  const { name, description, image_url, user } = plant;
  const [isUpdating, setIsUpdating] = useState(false);
  const [detail, setDetail] = useState(false);
  const [error, setError] = useState([]);
  const defaultForm = {
    name: name,
    description: description,
    image_url: image_url,
  };

  const [formData, setFormData] = useState(defaultForm);

  function handleChange(e) {
    const key = e.target.name;
    const value =
      key === "name" || key === "description" || key === "image_url"
        ? e.target.value
        : parseInt(e.target.value);
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((a) => {
          // onUpdatePlant(a);
          setIsUpdating(false);
        });
      } else {
        r.json().then((e) => setError(e.error));
      }
    });
  }

  function handleDelete(id) {
    fetch(`/plants/${id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(id));
  }

  function handleDetail(id) {
    fetch(`/plants/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((a) => {
          setDetail(!detail);
        });
      } else {
        r.json().then((e) => setError(e.error));
      }
    });
  }

  return (
    <div style={style}>
      {isUpdating ? (
        <form className="UpdateItem" onSubmit={handleSubmit}>
          <label>name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label>image url:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />

          <button className="btn" type="submit">
            Save
          </button>
        </form>
      ) : (
        <div className="details">
          <div className="imgg">
            <img src={image_url} alt="plant" style={style} />
          </div>
          <div className="inner-details">
            <h3>PLANT NAME: {name}</h3>
            <br></br>
            <p>
              <span style={{ color: "green" }}>Care description</span>:{" "}
              {description}
            </p>
          </div>
        </div>
      )}

      {edit ? (
        <button
          className="btn"
          id="update"
          onClick={() => setIsUpdating((isUpdating) => !isUpdating)}
        >
          Update
        </button>
      ) : null}
      {edit ? (
        <button
          className="btn"
          id="delete"
          onClick={(e) => handleDelete(plant.id)}
        >
          Delete
        </button>
      ) : null}
      {edit ? null : (
        <button
          className="btn"
          id="detail"
          onClick={(e) => handleDetail(plant.id)}
        >
          See user's detail
        </button>
      )}
      {detail ? (
        <div>
          <p> Users occupation: {user.occupation}</p>
          <p> Users interest: {user.interest}</p>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default Plant;
