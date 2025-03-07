import { useLocation, useParams, Link } from 'react-router-dom'

function handleClick( cartItems, numCartItems, setNumCartItems, item){
    setNumCartItems(numCartItems+1);
    cartItems.push({ item })
    console.log(cartItems)
}

export default function ProductPage( { cartItems, numCartItems ,setNumCartItems} ){
    // const { id } = useParams();
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
                    <p> {numCartItems} </p>
                </div>
            </div>
            <div className='text-center m-2 p-2' > 
                <Link className='border border-textColor rounded p-2' to="/cart">Buy Now</Link>
                <br/>
                <button  className="m-3 border border-textColor rounded p-2" onClick={() => handleClick( cartItems, numCartItems, setNumCartItems, item)}> Add to Cart </button>
            </div>
        </div>
    );
}