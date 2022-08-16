import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";


function App() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaToEdit, setPizzaToEdit] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then(res => res.json())
      .then(data => setPizzas(data))
      .catch(e => console.error(e));
  }, [])

  return (
    <>
      <Header />
      <PizzaForm pizza={pizzaToEdit} />
      <PizzaList pizzas={pizzas} onEditPizza={setPizzaToEdit} />
    </>
  );
}

export default App;
