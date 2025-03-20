import ProductsList from "./pages/ProductsList"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from "react";
import CartList from "./pages/CartList";

function App() {
  //creamos el carrito con el localstorage
  const cartStorage = localStorage.getItem('cartStorage') ? JSON.parse(localStorage.getItem('cartStorage')) : [];

  const [cart, setCart] = useState(cartStorage);

  useEffect(() => {
    localStorage.setItem('cartStorage', JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <section className="container">
        <div className="row">
          <div className="col-md-8">
            <ProductsList cart={cart} setCart={setCart} />
          </div>
          <div className="col-md-4">
            <CartList cart={cart} setCart={setCart} />
          </div>
        </div>
      </section>
      
    </>
  )
}

export default App
