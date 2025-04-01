import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import trash from '../../assets/images/trash.svg';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';

export default function Cart ( { itemCount, setItemCount, isDark, cartItems, setCartItems, setCartTotal}){

    const [ itemSet, setItemSet ] = useState([]);
    var total = 0;
    var isCartEmpty = itemCount === 0 ? true : false;

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

    const handleTotal = () => {
        setCartTotal(total.toFixed(2));
    }

    const minusClass = [
        "size-5","scale-100", "hover:scale-110", "m-2",
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
            total += (cartItems.get(id) * e.price);
            
            elements.push(
                <div className='border border-textColor rounded-md' key={id}>
                    <div className='m-3'>
                        {e.product_name}
                        <br/>
                        <p className='text-xs'>{"by " + e.supplier}</p>

                        {e.price}
                    </div>
                    <div className='flex m-7 border-2 border-checkout rounded-2xl'>
                        <button onClick={() => deleteFromCart(id)}><img src={cartItems.get(id) === 1 ? trash : minus} className={minusClass} /></button>
                        <div className='pt-1 size-3 text-lg'>{cartItems.get(id)}</div>
                        <button onClick={() => addToCart(id)}><div className=' fill-textColor'><img src={plus} className={plusClass} /></div></button>
                        
                        {/* Code below is for an SVG image as a React component, testing color on images */}
                        {/* <button onClick={() => addToCart(id)}><div className='m-2'><PlusIcon /></div></button> */}

                    </div>
                </div>
            )
        })

        return elements
    }

    return(
        <div className='flex justify-center'>
            <div className="text-textColor text-center ">
                { isCartEmpty ?<h1 className='p-32'> Cart is empty!</h1> : null}
                { isCartEmpty ? "" :  <button onClick={handleClear} className='underline scale-90 hover:scale-100'>Clear Cart</button>}
                <div>
                    {myItems()}
                </div>
                    
            </div>

            { !isCartEmpty ? <div className=" bg-navBar rounded-xl border border-textColor absolute inset-y-28 right-2 h-1/6">
                <div className='m-2'>
                    <p className='text-textColor'>{ isCartEmpty ? "" : "Total: $" + total.toFixed(2)}</p>
                </div>

                <div className='m-2'>
                    <Link to="/checkout" onClick={()=>handleTotal()}>
                        <button className="rounded-2xl border bg-checkout border-textColor text-textColor p-2 scale-100 hover:scale-105">Proceed to Checkout</button>            
                    </Link>
                </div>
            </div> : ""}

        </div>
    );
}
