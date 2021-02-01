import React, {useEffect, useState} from 'react';
import {foodMenu} from '../types/FoodType'
import axios from 'axios'
import {menuRefeicao} from '../types/Refeicoes'

const Foods = () => {
  const [foodCategoria, setCategoria] = useState<foodMenu[]>([])
  const [buscaFood, setbusca] = useState<string>()
  const [refeicoesDigi,setRefeicoes] =useState<menuRefeicao[]>([])

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(resposta => setCategoria(resposta.data.categories))
  }, [])
  useEffect(() => {
    
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${buscaFood}`)
        .then(resposta => setbusca(resposta.data.meals))
  }, [buscaFood])
  
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${buscaFood}`)
        .then(resposta => setRefeicoes(resposta.data.meals))
  }, [buscaFood])
 
  
    return (

    <div className="food-beer-list food-shop">
      <h1>Tipos de pratos</h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input type="text" placeholder="Digite a comida..." onChange={(event) => setbusca(event?.target.value)}/>
      </p>

      <ul>
      {
            foodCategoria.map((item:foodMenu) => (
              <div key={item.idCategory} className="catalog">
              <img src={item.strCategoryThumb} alt={item.strCategory}/>
              <li onClick={() => setbusca(item.strCategory)}>{item.strCategory}</li>
              </div>
            ))
          }
      </ul>
      <h2>Tipo selecionado: <strong>{buscaFood}</strong></h2>
      
          <div className="food-container">
        
          </div>
        </div>
      );
    }

    export default Foods;
