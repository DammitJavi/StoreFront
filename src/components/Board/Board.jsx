import { Link } from 'react-router-dom';

import Card from '../Card/Card.jsx';

export default function Board( {board}){

    const cardItem = board.map( (item) =>
        <Link key={item.id} to={`/product/${item.id}`}><Card item = {item}/></Link>
    );

    return(
        <div className='flex overflow-scroll content-center'>
            {cardItem}
        </div>
    );
}