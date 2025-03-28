import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function ProductPage( { itemCount, setItemCount, cartItems} ){
    
    const { id } = useParams();
    const [result, setResult] = useState(null);
    
    const addToCart = () => {

        setItemCount((itemCount+=1));
        const quantity = !cartItems.has(result.value.id) ? 1 : (cartItems.get(result.value.id) + 1)
        cartItems.set( result.value.id , quantity );

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
                <h1 className='text-center p-2'> { result.value.product_name} </h1>
             
                <div className='text-center m-2'>
                    <h2> {result.value.category} </h2>
                    <p> {result.value.price} </p>
                    <p> {result.value.sku} </p>
                    <p> {result.value.dimensions} </p>
                    <p> {result.value.status} </p>
                </div>
            </div>
            <div className='text-center m-2 p-2' > 
                <Link className='border border-textColor rounded p-2' to="/checkout"><button onClick={() => addToCart( )}> Buy Now</button></Link>
                    
                <br/>
                <button  className="m-3 border border-textColor rounded p-2" onClick={() => addToCart()}> Add to Cart </button>
            </div>
        </div>
    );
}
}