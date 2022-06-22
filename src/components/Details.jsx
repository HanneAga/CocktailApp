import React from "react";
//import { useState } from 'react';
//import axios from 'axios';
import styled from "styled-components";

import { HiArrowNarrowUp } from "react-icons/hi";

function Details(props) {
  const cocktail = props.cocktail;
  if (!cocktail) {
    return null;
  }

  return (
    <DetailWindow
      key={cocktail.idDrink}
      id={props.currentid}
      className="detail-window"
    >
      <TextDiv className="text-box-details">
        <div> Navn: {cocktail.strDrink} </div>
        <div>
          {" "}
          Ingredienser: {cocktail.strIngredient1}, {cocktail.strIngredient2},{" "}
          {cocktail.strIngredient3}{" "}
        </div>
        <div className="oppskrift"> Oppskrift: {cocktail.strInstructions}</div>
      </TextDiv>
      <div className="img-container">
        <img src={cocktail.strDrinkThumb} alt="bilde av cocktail" />
      </div>
    </DetailWindow>
  );
}

const DetailWindow = styled.div`
  overflow: auto;
  background-color: white;
  color: black;
  z-index: 10;
  border: 6px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  width: 100%;
  flex-grow: 1;
  font-size: 15px;

  img {
    height: 200px;
    width: 200px;
    object-fit: scale-down;
    border-radius: 10px;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  gap: 10px;
  word-wrap: break-word;
  padding: 10px;

  .oppskrift {
    max-width: 50vw;
  }

  /*
.exit-details{
  visibility: hidden;
  color:black;
    font-size: 1rem;
    cursor: pointer; 
    background-color: white;
    border-radius: 50%;
    flex: 2;
    position: absolute;
   
    
    
    

}*/
`;

export default Details;
