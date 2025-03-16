import { Link } from 'react-router-dom';
import { useState } from 'react';

import Card from '../Card/Card.jsx';

function handleClick(display, setDisplay){
    (display === "flex" ? setDisplay("grid grid-cols-4"): setDisplay("flex"))
}

export default function Board( {board}){

    const [display, setDisplay] = useState("flex");

    const cardItem = board.map( (item) =>
        <div className='m-2'>
            <Link className='border contents' key={item.id} to={`/product/${item.id}`}><Card item = {item}/></Link>
        </div>
    );
 
    return(
        <div className='text-textColor'>
            <div className='absolute'>
                <button className="hover:underline" onClick={()=>handleClick(display, setDisplay)} >See all</button>
            </div>
            <div className={`${display} overflow-scroll content-center`}>
                {cardItem}
            </div>
        </div>
    );
}