import Board from '../Board/Board.jsx'

function iterateBoards(catSet){
    // Elements to add to render.
    const elements = [];

    for( const x of catSet){
        elements.push(
            <div key={elements.length} className='border border-black m-2 p-2'>
                <p>{x && x[0].category}</p>
                <Board board={x}/>
            </div> 
    )}
    return elements
}

export default function Home( {catSet} ){

    return(   
        <div>
            {iterateBoards(catSet)}
        </div>
    );
}
