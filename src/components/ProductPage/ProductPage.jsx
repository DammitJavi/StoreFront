import { useLocation, Link } from 'react-router-dom'

function handleClick( cartItems, item, index, setIndex){
    setIndex((index+=1));
    cartItems.push({ item, index })
    console.log(cartItems)
}

export default function ProductPage( { cartItems, index, setIndex} ){

    const location = useLocation();
    const { item } = location.state || {};

    if (!item) {
        return <div>Product not found or loading...</div>;
    }

    return(
        <div className="text-textColor bg-card ">
            <div className='w-48 m-auto border-textColor border-4'> 
                   {/* { id } */}
                <h1 className='text-center p-2'> { item.product_name} </h1>
             
                <div className='text-center m-2'>
                    <h2> {item.category} </h2>
                    <p> {item.price} </p>
                    <p> {item.sku} </p>
                    <p> {item.dimensions} </p>
                    <p> {item.status} </p>
                    <p> {Object.keys(cartItems).length} </p>
                </div>
            </div>
            <div className='text-center m-2 p-2' > 
                <Link className='border border-textColor rounded p-2' to="/checkout"><button onClick={() => handleClick( cartItems, item, index, setIndex )}> Buy Now</button></Link>
                    
                <br/>
                <button  className="m-3 border border-textColor rounded p-2" onClick={() => handleClick( cartItems, item, index, setIndex )}> Add to Cart </button>
            </div>
        </div>
    );
}