import React from 'react';
//allCharacters es allcharacters.length
export default function Paginado ({charactersPerPage, allCharacters,paginado}) {
    const pageNumbers = [];
        for(let i=1; i<=Math.ceil(allCharacters / charactersPerPage); i++){
            pageNumbers.push(i);
        }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className='number' key={number}> 
                            <a onClick={() => paginado(number)} >{number}</a>
                        </li>
                    ))
                }     
            </ul>
        </nav>
    )
}