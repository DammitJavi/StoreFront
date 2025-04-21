import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function ProductPage( { itemCount, setItemCount, cartItems} ){
    
    const { id } = useParams();
    const [result, setResult] = useState(null);
    
    const addToCart = () => {

        setItemCount((itemCount+=1));
        const quantity = !cartItems.has(result.id) ? 1 : (cartItems.get(result.id) + 1)
        cartItems.set( result.id , quantity );

    }


    useEffect(() => {
        const serverData = async () => {
            try{
                const response = await fetch(`http://localhost:3000/api/product/${id}`, {
                    method: 'GET',
                });
                const myData = await response.json();

                setResult(myData);
                
                console.log('Server Response', myData);
            } catch(error){
                console.error('Error:', error );
            }
        };
        serverData();
    }, [id]);
    
    if(result === null){
        return <div> Loading...</div>
    }
    else{
        return(
            <div className="text-textColor bg-card ">
            <div className='w-48 m-auto border-textColor border-4'> 
                <h1 className='text-center p-2'> { result.product_name} </h1>
             
                <div className='text-center m-2'>
                    <h2> {result.category} </h2>
                    <p> {result.price} </p>
                    <p> {result.sku} </p>
                    <p> {result.dimensions} </p>
                    <p> {result.status} </p>
                </div>
            </div>
            <ul className='text-center m-2 p-2' > 
                <li className="scale-90 hover:scale-100">
                    <Link className='border border-textColor rounded p-2' to="/checkout"><button onClick={() => addToCart()}> Buy Now</button></Link>  
                </li>
                <li className="scale-90 hover:scale-100">
                    <button className="m-3 border border-textColor rounded p-2" onClick={() => addToCart()}> Add to Cart </button>
                </li>
            </ul>
        </div>
    );
}
}