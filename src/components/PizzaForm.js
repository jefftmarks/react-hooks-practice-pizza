import React from "react";

function PizzaForm({ pizza, onChangeInput, onUpdatePizza }) {

  if (!pizza) return null;

  const {topping, size, vegetarian, id} = pizza;

  function handleInputChange(event) {
    onChangeInput(event.target.name, event.target.value)
  }

  function handleRadioChange(event) {
    let value;
    if (event.target.value === "Vegetarian") {
      value = true;
    } else if (event.target.value === "Not Vegetarian") {
      value = false;
    }
    onChangeInput(event.target.name, value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
      .then(res => res.json())
      .then(updatedPizza => onUpdatePizza(updatedPizza))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={size} onChange={handleInputChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
