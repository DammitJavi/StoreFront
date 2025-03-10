import { useState , useEffect } from 'react'
import { BrowserRouter, Routes , Route, Link } from 'react-router-dom';

import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import Cart from './components/Cart/Cart.jsx'
import ProductPage from './components/ProductPage/ProductPage.jsx';
import Checkout from './components/Checkout/Checkout.jsx';


function App() {
  
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [inventoryData, setInventoryData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [ index, setIndex ] = useState(-1);

  useEffect(() => { fetch('http://localhost:3000/api')
      .then(res => res.json())
      .then(data => {
          setInventoryData(data)
          console.log(data)
      })
      .catch(err => console.error('Error', err));
    }, [])

  return (
    <div className={`${isDark ? 'dark' : 'light'} min-h-screen `} >
      <BrowserRouter>
        <NavBar isDark={isDark} setIsDark={setIsDark} cartItems={cartItems}/>
        <Routes>

          <Route  path="/" element= { 
            <div className="grid grid-cols-5 gap-4"> { 
              isLoggedIn ? inventoryData && inventoryData.map( item => (
                <Link className='w-0' key={item.id} state={{ item }} to={`/product/${item.id}`}> 
                  <Home item={item} /> 
                </Link>)): 
                <LoginPage isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} /> } 
            </div>
          }/>
          
          <Route path="/product/:id" element={ <ProductPage cartItems={cartItems} index={index} setIndex={setIndex} /> }/>
          <Route path="/about" element={<About/>}/>
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} isDark={isDark} />}/>
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems}/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
