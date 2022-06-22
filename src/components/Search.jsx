import React from 'react'
import styled from 'styled-components';
import { BiSearch} from 'react-icons/bi';
import {useState } from 'react';
//import {useNavigate} from 'react-router-dom';


function Search (props){
    

    const [input, setInput] = useState('');
   // const navigate = useNavigate();

//forhindre at vi rendrer det vi ikke trenger å rendre
    const submitHandler = (e) => {
        e.preventDefault();
        //navigate('/search/' + input)

    }


  return (
    <SearchBar onSubmit={submitHandler}>
        <div>
        <BiSearch className='search-icon'/>
        <input onChange={(e)=> setInput(e.target.value)} type="text" value={input}/>
        </div>
    </SearchBar>
  )
}

const SearchBar = styled.div`

background: linear-gradient(180deg, #2e2e2e, #393939);
height: 3rem;
width: 15rem;
border-radius: 10px;
color:white;
z-index:5;
font-size:1.2rem;
text-align: center;
font-weight: 700;
display: flex;
justify-content: center;
align-items: center;
position: relative;
top: 80%;
border: 2px solid #50F2E8;



div{
    position:relative;
    width:100%;
    display: flex;
justify-content: center;
align-items: center;
}

search-icon{
    flex:1;
    margin:1rem;
    
    
}
input{
    background: linear-gradient(180deg, #2e2e2e, #393939);
    border:none;
    color:white;
    cursor: pointer;
    height: 2rem;
    font-size:1.2rem;
}

`
    


export default Search