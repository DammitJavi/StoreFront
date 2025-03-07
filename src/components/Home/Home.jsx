import Card from '../Card/Card.jsx'

export default function Home( {item} ){

    return(
        <div className='p-0 content-center bg-current'>
            <Card item={item}/>
        </div>
    );
}

