import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import trash from '../../assets/images/trash.svg';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';

export default function Cart ( { itemCount, setItemCount, isDark, cartItems, setCartItems}){

    const [ itemSet, setItemSet ] = useState([]);

    const addToCart = ( id ) => {
        const newMap = new Map(cartItems);
        const newValue = newMap.get(id) + 1;
        newMap.set(id, newValue);
        setItemCount(itemCount+=1);
        setCartItems(newMap);
    }

    const deleteFromCart = ( id ) => {
        const newMap = new Map(cartItems);
        const newValue = newMap.get(id) - 1;

        if(newValue > 0 ){
            newMap.set(id, newValue)
        }
        else{
            newMap.delete(id);
            const newItemSet = itemSet.filter(item => item.id !== id);
            setItemSet(newItemSet);
        }
        
        setItemCount(itemCount-=1);
        setCartItems(newMap);
    }

    useEffect(() => {

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
    
    const handleClear = () =>{
        setItemCount(0);
        cartItems.clear();
        setItemSet([]);
    }

    const minusClass = [
        "size-5","scale-90", "hover:scale-100", "m-2",
        isDark ? 'invert' : '',
    ].join(' ');

    const plusClass = [
        "size-5","scale-90", "hover:scale-100", "m-2",
        isDark ? 'invert' : '',
    ].join(' ');


    const myItems = () => {

        const elements = [];
        itemSet.forEach( e => {
            var id = e.id
            elements.push(
                <div className='border border-textColor' key={id}>
                    {e.product_name}

                    <div className='pt-3 flex content-center'>
                        <button onClick={() => deleteFromCart(id)}><img src={cartItems.get(id) === 1 ? trash : minus} className={minusClass} /></button>
                        <div className='pt-1 size-3 text-lg'>{cartItems.get(id)}</div>
                        <button onClick={() => addToCart(id)}><img src={plus} className={plusClass} /></button>
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
                <div>
                    {myItems()}
                </div>
                    
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
