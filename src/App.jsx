import { useState , useEffect } from 'react'
import { BrowserRouter, Routes , Route, Link, data } from 'react-router-dom';

import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import Cart from './components/Cart/Cart.jsx'
import ProductPage from './components/ProductPage/ProductPage.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';


function App() {
  
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [inventoryData, setInventoryData] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [index, setIndex] = useState(-1);

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
        <NavBar isDark={isDark} setIsDark={setIsDark} cartItems={cartItems} inventoryData={inventoryData}/>
        <Routes>
        { isLoggedIn ? (
          <>
            <Route path="/" element={ <Home catSet={catSet}/> }/>          
            <Route path="/product/:id" element={ <ProductPage cartItems={cartItems} index={index} setIndex={setIndex} /> }/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} isDark={isDark}/>}/>
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems}/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>

          </>
        ):(
          <>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="*" element={<LoginPage/>}/>
          </>
        )}
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
