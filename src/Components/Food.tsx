import React, { useEffect, useState } from "react";
import { foodMenu } from "../types/FoodType";
import axios from "axios";
import { menuRefeicao } from "../types/Refeicoes";

const Foods = () => {
  const [foodCategoria, setCategoria] = useState<foodMenu[]>([]);
  const [buscaFood, setbusca] = useState<string>();
  const [refeicoesDigi, setRefeicoes] = useState<menuRefeicao[]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((resposta) => setCategoria(resposta.data.categories));
  }, []);
  useEffect(() => {
    if (buscaFood !== null)
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${buscaFood}`
        )
        .then((resposta) => setRefeicoes(resposta.data.meals));
  }, [buscaFood]);

  useEffect(() => {
    if (search !== null)
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((resposta) => setRefeicoes(resposta.data.meals));
  }, [search]);

  return (
    <div className="food-beer-list food-shop">
      <h1>
        <strong>AIFOME</strong>
      </h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input
          type="text"
          placeholder="Digite a comida..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </p>

      <ul>
        {foodCategoria !== null &&
          foodCategoria.map((item: foodMenu) => (
            <li
              key={item.idCategory}
              onClick={() => setbusca(item.strCategory)}
            >
              {item.strCategory}
            </li>
          ))}
      </ul>
      <h2>
        Tipo selecionado: <strong>{buscaFood}</strong>
      </h2>

      <div className="food-container">
        {refeicoesDigi !== null &&
          refeicoesDigi.map((item: menuRefeicao) => (
            <div className="food-item" key={item.idMeal}>
              <img src={item.strMealThumb} />
              <p>{item.strMeal}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Foods;
