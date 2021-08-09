import React from 'react';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCharacters, orderByName, filterCharactersByStatus, filterCreated } from '../../Actions/index';
import Card from '../Card/Card';
//import SearchBar from "./SearchBar"; 
import Paginado from "../Paginado/Paginado";

export default function Home (){
  const dispatch = useDispatch()
  

  useEffect (()=>{
    dispatch(getCharacters());
  },[dispatch])



  const allCharacters = useSelector((state) => state.characters);
  //const occupations = useSelector((state) => state.occupations);
  const [orden, setOrden]= useState('')
  const [currentPage,setCurrentPage] = useState(1);
  const [charactersPerPage,setCharactersPerPage]= useState(6);
  const indexOfLastCharacter = currentPage * charactersPerPage; //6
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; //0
  const currentCharacters = allCharacters.slice(indexOfFirstCharacter,indexOfLastCharacter)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; 

  function handleClick(e){
    e.preventDefault();
    dispatch(getCharacters());
    }

  function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
     setOrden(`Ordenado ${e.target.value}`)
  };

  const handleFilterStatus = (e) => {
    dispatch(filterCharactersByStatus(e.target.value));
  };
  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  

  return (
    <div className="divHome">
     <Link to="/character">Crear Personaje</Link>
     <h1>AGUANTE BREAKING BAD</h1>
     <button
       onClick={(e) => {
         handleClick(e);
       }}
     >
       Volver a cargar todos los personajes
     </button>
     {/* <SearchBar /> */}
     <div>
       <select onChange={e => handleFilterStatus(e)}>
         <option value="All">Todos</option>
         <option value="Alive">Vivo</option>
         <option value="Deceased">Muerto</option>
         <option value="Unknown">Desconocido</option>
         <option value="Presumed dead">Probablemente muerto</option>
       </select>
       <select onChange={e => handleFilterCreated(e)} >
         <option value="All">Todos</option>
         <option value="created">Creados</option>
         <option value="api">De la Api</option>
       </select>
     </div>
     <div>
       <select onChange={e => handleSort(e)} >
         <option value="asc">Ascendente</option>
         <option value="desc">Descendente</option>
       </select>
     <Paginado
     charactersPerPage={charactersPerPage}
     allCharacters={allCharacters.length} 
     paginado={paginado}
/>
     </div> 
      {currentCharacters?.map((c) => {
       return (
         <fragment className='cartas'>
           <Link to={"/home/" + c.id}>
             <Card name={c.name} image={c.image} nickname={c.nickname}  key={c.id} />
           </Link>
         </fragment>
       );
     })} 
   </div>
 );
}