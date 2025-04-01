import { useState , useEffect } from 'react'
import { BrowserRouter, Routes , Route, Link, data } from 'react-router-dom';

import Home from './components/Home/Home.jsx'
import Account from './components/Account/Account.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import Cart from './components/Cart/Cart.jsx'
import ProductPage from './components/ProductPage/ProductPage.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';


function App() {
  
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [inventoryData, setInventoryData] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(new Map());
  const [cartTotal, setCartTotal] = useState(0);


  useEffect(() => { fetch('http://localhost:3000/api/')
      .then(res => res.json())
      .then(data => {
          setInventoryData(data)
          console.log(data)
      })
      .catch(err => console.error('Error', err));
  }, [])
  
  // Get the unique categories from inventory.
  const uniqueCategories = new Set(inventoryData && inventoryData.map( p => p.category));

  //Create a set that has inventory by category.
  const catSet = new Set(null);
  for ( const x of uniqueCategories){
      catSet.add( inventoryData.filter(item => item.category === x))
  }


  return (
    <div className={`${isDark ? 'dark' : 'light'} min-h-screen`} >
      
      <BrowserRouter>
        <NavBar isDark={isDark} setIsDark={setIsDark} itemCount={itemCount} inventoryData={inventoryData} isLoggedIn={isLoggedIn}/>
        <Routes>
        { isLoggedIn ? (
          <>
            <Route path="/" element={ <Home catSet={catSet}/> }/>          
            <Route path="/account" element={<Account user={user} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/cart" element={<Cart itemCount={itemCount} setItemCount={setItemCount} isDark={isDark} cartItems={cartItems} setCartItems={setCartItems} setCartTotal={setCartTotal}/>}/>
            <Route path="/checkout" element={<Checkout cartTotal={cartTotal}/>}/>
            <Route path="/login" element={ <LoginPage setLoggedIn={setLoggedIn} setUser={setUser}/> } />
            <Route path="/product/:id" element={ <ProductPage itemCount={itemCount} setItemCount={setItemCount} cartItems={cartItems} /> }/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="*" element={<NotFound/>}/>

          </>
        ):(
          <>
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUser={setUser}/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="*" element={<LoginPage setLoggedIn={setLoggedIn} setUser={setUser}/>}/>
          </>
        )}
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
