import React, { useState, useEffect } from 'react'
import './Cart.scss'
export default function Cart({ cart, setFlag, flag }) {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    let currentCard = JSON.parse(localStorage.getItem('cart') ?? '[]');
    let TotalPrice = currentCard.reduce((sum, acc) => sum + acc.quantity * acc.price, 0);
    setTotal(TotalPrice);
  }, [cart]);
  return (
    <>
      <h3>Cart</h3>
      <hr></hr>
      <ul className='cart_item'>
        {cart.map((item, index) => {
          const product = JSON.parse(localStorage.getItem('product') ?? '[]')
          const cartProduct = product.find(Product => Product.id == item.id)
          let currentCard = JSON.parse(localStorage.getItem('cart') ?? '[]')
          let newCart = currentCard.find(findItem => findItem.id == item.id)
          let deleteCart = currentCard.filter(findItem => findItem.id != item.id)
          return (
            <li className='cart_item_container' key={index}>
              <div className='cart_item_left'>
                <div className='img'><img src={cartProduct.img} alt="" /></div>
                <p>{cartProduct.product_name}</p>
              </div>
              <div><p>{cartProduct.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p></div>
              <div className='cart_item_info'>
                <button
                  onClick={() => {
                    newCart.quantity += 1
                    localStorage.setItem('cart', JSON.stringify(currentCard))
                    setFlag(!flag)
                  }}
                ><i class="fa-solid fa-plus"></i></button>
                <p>{item.quantity}</p>
                <button
                  onClick={() => {
                    if (newCart.quantity == 1) {
                      localStorage.setItem('cart', JSON.stringify(deleteCart))
                      setFlag(!flag)
                    } else {
                      newCart.quantity -= 1
                      localStorage.setItem('cart', JSON.stringify(currentCard))
                      setFlag(!flag)
                    }
                  }
                  }
                ><i class="fa-solid fa-minus"></i></button>
                <button onClick={() => {
                  localStorage.setItem('cart', JSON.stringify(deleteCart))
                  setFlag(!flag)
                }}><i class="fa-solid fa-trash"></i></button>
              </div>

            </li>
          )
        })}
      </ul>
      <hr></hr>
      <p className='total'>Tổng tiền: <span>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> </p>
    </>
  )
}
