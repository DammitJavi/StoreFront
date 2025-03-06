import { useState , useEffect } from 'react'
import { BrowserRouter, Routes , Route, Link } from 'react-router-dom';

import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import Cart from './components/Cart/Cart.jsx'
import ProductPage from './components/ProductPage/ProductPage.jsx';


function App() {
  
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [inventoryData, setInventoryData] = useState(null);

  useEffect(() => { fetch('http://localhost:3000/api')
      .then(res => res.json())
      .then(data => {
          setInventoryData(data)
          console.log(data)
      })
      .catch(err => console.error('Error', err));
    }, [])

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <BrowserRouter>
        <NavBar isDark={isDark} setIsDark={setIsDark} />
        <Routes>

          <Route  path="/" element= { 
            <div className="grid grid-cols-5 gap-4 z-0"> { isLoggedIn ? inventoryData && inventoryData.map( item => (
              <Link key={item.id} state={{item}} to={`/product/${item.id}`}> 
                <Home item={item} /> 
              </Link>)): <LoginPage isLoggedIn={isLoggedIn} setIsDark={setLoggedIn} /> } 
            </div>
          }/>

          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
