import { useState, useEffect } from 'react'
import data from './data.json'
import Cart from './conponent/Cart/Cart'
import Product from './conponent/Products/Products'
import './App.scss'
function App() {
  const [product, setProduct] = useState(data)
  const [flag, setFlag] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])
  localStorage.setItem('product', JSON.stringify(product))
  const currentCart = JSON.parse(localStorage.getItem('cart'))
  if (!currentCart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  useEffect(() => {
    if (showCart) {
      document.querySelector('.cart_container').style.display = 'block'
    } else {
      document.querySelector('.cart_container').style.display = 'none'
    }
  }, [showCart])

  useEffect(
    () => {
      const cart = JSON.parse(localStorage.getItem('cart') ?? '[]')
      const totalOfCart = cart.reduce((total, item) => total + item.quantity, 0);
      setTotal(totalOfCart)
      setCart(JSON.parse(localStorage.getItem('cart') ?? '[]'))
    }
    , [flag])
  return (
    <>
      <div className="app_body">
        <header className='app_head'>
          <ul>
            <li>Trang chủ</li>
            <li>Danh sách sản phẩm</li>
          </ul>
          <div onClick={() => {
            setShowCart(!showCart)
          }}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{total}</span>
          </div>
        </header>
        <h1>DANH SÁCH SẢN PHẨM</h1>
        <div className='product_container'>

          <Product product={product} setFlag={setFlag} flag={flag} />
        </div>
        <div className='cart_container'>

          <Cart cart={cart} setFlag={setFlag} flag={flag} />
        </div>

      </div>

    </>
  )
}

export default App
