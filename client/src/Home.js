import React, {useEffect, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './context/AppContext';
import { storeItems } from './items';
import Store from './components/Store';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import CheckoutForm from './components/CheckoutForm';
// import GoogleSignIn from './components/Login';




// new components
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/SignUp/Login'
import About from './pages/About/About';
import { AuthContext } from './context/AuthContext';
import { BASE_URL } from './util/constant';
import axios from 'axios';

function Home() {
  const {user, setUser} = useContext(AuthContext);
  
  useEffect(() => {
    getUser();
  }, [user])

  async function getUser() {
    const token = localStorage.getItem('token');

    if (!token)
      return

    try {
      let res = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.user)
        setUser(res.data.user)
    } catch (err) {
      setUser('')
    }
  }
  return (
    <Router>
      <AppContext.Provider value={storeItems}>
        <CartProvider>
          <Navbar />
          {user && <Cart />}
          <Routes>
            <Route exact path="/" element={<Store items={storeItems} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </CartProvider>
      </AppContext.Provider>
    </Router>
  );
}

export default Home;

