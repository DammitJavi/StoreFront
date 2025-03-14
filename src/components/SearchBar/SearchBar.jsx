import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import searchBar from '../../assets/images/search.svg';

function handleSearch( e, setResults, setInputs, inventoryData ){
    const searchValue = e.target.value;
    setInputs(e.target.value);
    setResults(( Object.keys(searchValue).length === 0 ? {} : 
        inventoryData.filter( (inventory) => inventory.product_name.toLowerCase().includes(searchValue.toLowerCase()))));

}


export default function SearchBar( { inventoryData } ){

    const [results, setResults] =  useState('');
    const [input, setInputs] = useState('');

    const setValues = () => {
        setResults('');
        setInputs('');
    }
    

    return (
        <div className="w-2/3 pb-4 flex-none">
            <input className='w-2/3 size-8 border border-textColor bg-white pl-8 rounded-lg absolute' value={input} onChange={ (e) => handleSearch( e, setResults, setInputs, inventoryData )} type='input' placeholder="Search..."/>
            <button className="pt-1 pl-1 absolute scale-90 hover:scale-100" > <img alt='search' src={searchBar} className="size-6" /> </button>
            <div> 
                { Object.keys(results).length === 0 ? (<p>No results.</p> ) :  (
                
                <ul className='mt-10 absolute z-10 bg-white w-2/3'> 
                    { results.map( (r) => <NavLink to={`/product/${r.id}`} key={r.id} > <li className='size-40 border h-fit border-black w-full' onClick={()=>setValues()}> {r.product_name} </li> </NavLink>) }
                </ul>
            )}
            </div>
        </div>
    );  
}