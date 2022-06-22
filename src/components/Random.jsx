import React from 'react'
import styled from 'styled-components'

function Random() {
  return (
    <RandomButton>Random Cocktail</RandomButton>
  )
}

const RandomButton = styled.button`
//background: linear-gradient(180deg, #f207d6, #f9d406);
height: 3rem;
width: 15rem;
border-radius: 10px;
color:black;
z-index:5;
font-size:1.2rem;
text-align: center;
position: relative;
right: -40%;
font-weight: 700;
:hover{
    //background: linear-gradient(180deg, #f207d6, #f9d406);
    transform:scale(1.1)
}
`


export default Random