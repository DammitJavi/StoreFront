import Card from '../Card/Card.jsx'

export default function Home( {item} ){

    return(
        <div> 
            <div className='w-0'>
                <Card item={item}/>
            </div>
        </div>
    );
}

