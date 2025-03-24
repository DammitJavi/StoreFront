import { Link } from 'react-router-dom';
import { useState } from 'react';

import Card from '../Card/Card.jsx';

export default function Board( {board}){
    
    const [display, setDisplay] = useState("flex");
    const [displayText, setDisplayText] = useState("See All");
    
    function handleClick(){
        (display === "flex" ? setDisplay("grid grid-cols-4"): setDisplay("flex"))
        (displayText === "See All" ? setDisplayText("See Less") : setDisplayText ("See All"))
    
    }
    const cardItem = board.map( (item) =>
        <div className='m-2' key={item.id}>
            <Link className='border contents' key={item.id} to={`/product/${item.id}`}><Card item = {item}/></Link>
        </div>
    );
 
    return(
        <div className='text-textColor'>
            <div className='absolute'>
                <button className="hover:underline" onClick={()=>handleClick()} >{displayText}</button>
            </div>
            <div className={`${display} overflow-scroll content-center`}>
                {cardItem}
            </div>
        </div>
    );
}