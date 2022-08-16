import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";


function App() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaToEdit, setPizzaToEdit] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then(res => res.json())
      .then(data => setPizzas(data))
      .catch(e => console.error(e));
  }, [])

  function onChangeInput(name, value) {
    setPizzaToEdit({
      ...pizzaToEdit,
      [name]: value,
    })
  }

  function handleUpdatePizza(updatedPizza) {
    setPizzas(pizzas.map(pizza => {
      if (pizza.id === updatedPizza.id) {
        return updatedPizza
      } else {
        return pizza;
      }
    }))
    setPizzaToEdit(null)
  }

  return (
    <>
      <Header />
      <PizzaForm pizza={pizzaToEdit} onChangeInput={onChangeInput} onUpdatePizza={handleUpdatePizza} />
      <PizzaList pizzas={pizzas} onEditPizza={setPizzaToEdit} />
    </>
  );
}

export default App;
