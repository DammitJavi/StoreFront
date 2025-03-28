import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import trashDark from '../../assets/images/trash-dark.svg'
import trashLight from '../../assets/images/trash-light.svg'


export default function Cart ( { itemCount, setItemCount, isDark, cartItems }){
    
    function deleteFromCart(){
    // const updateItems = cartItems.filter(item => item.index !== index );
    // setCartItems(updateItems);
    }

    const [ trashImg, setTrashImg ] = useState(null);
    const [ itemSet, setItemSet ] = useState([]);

    useEffect(() => {
        (isDark ? setTrashImg(trashDark) : setTrashImg(trashLight) )
        const dataFetch = async () => {
            try{
                const keys = Array.from(cartItems.keys());
                const response = await fetch(`http://localhost:3000/api/product/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({keys}),
                });

                const myInventoryData = await response.json();
                const allProduct = Object.values(myInventoryData);
                setItemSet(allProduct);  

            } catch(error){
                console.error('Error:', error );
            }
        };
        dataFetch();

    },[]);

    const handleDelete = () => {

        const quantity = cartItems.get(result.value) === 1 ? cartItems.delete(result) : (cartItems.get(result.value) - 1)
        cartItems.set(result.value, quantity );

    }
    
    const handleClear = () =>{
        setItemCount(0);
        cartItems.clear();
        setItemSet([]);
    }

    const myItems = () => {

        const elements = [];
        itemSet.forEach( e => {
            var id = e.id
            elements.push(
                <div className='border border-textColor' key={id}>
                    {e.product_name}
                    <br/>
                    {cartItems.get(id)}

                    <div className='pt-3 pl-4'>
                        <button onClick={() => deleteFromCart()}><img src={trashImg} className='size-6 scale-90 hover:scale-100' /></button>
                    </div>
                </div>
            )
        })
        return elements
}

    return(
        <div className='flex justify-center'>
            <div className="text-textColor text-center border border-textColor">
                <h1>{ itemCount === 0 ? "Cart is empty!" : " "}</h1>
                <button onClick={handleClear}>Clear Cart</button>
                {myItems()}
            </div>
            <div className="absolute inset-y-28 right-2 flex ">
                <div>
                    <Link to="/checkout">
                        <button className="rounded-2xl border border-textColor text-textColor p-2">Proceed to Checkout</button>            
                    </Link>
                </div>
            </div>
        </div>
    );
}
