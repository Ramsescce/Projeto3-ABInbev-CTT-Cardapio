import React, { useEffect, useState } from 'react';
import {beerStyle} from '../types/BeerStyle'
import axios from 'axios'



const Beer = () => {

  const [beerBack,setBeer]= useState<beerStyle[]>([])
  const [mostreCerveja, SetCerveja]= useState<boolean>(false)
  useEffect(() => {
    
    axios.get('https://api.punkapi.com/v2/beers/?per_page=8')
              .then(resposta => setBeer(resposta.data))
    
  }, []);



  return (
    <>
      
      <div className="food-beer-list food-shop">
      
      <h1>Tipos de Cerveja</h1>
     
      <button onClick={()=> SetCerveja (!mostreCerveja)}>Buscar Cerveja</button>
    
        
      
      <div className="beers-list">
          
          {
           mostreCerveja && beerBack.map ((item:beerStyle)=>(
            <div key={item.id}>
            <div className="beer">
            <img src={item.image_url} alt="Buzz" />
            <h3>{item.name} </h3>
            <span>{item.tagline} </span>
            <small>{item.description} </small>
            
            </div>
            </div>
            
          ))
        } 
            
           
            
             
          </div>
     
    </div>
    </>
  );
}

export default Beer;