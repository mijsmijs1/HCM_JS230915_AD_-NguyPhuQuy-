import React from 'react'
import './Products.scss'
export default function Product({ product, setFlag, flag }) {

  return (
    <>
      {
        product.map(
          (item) => {
            return (
              <div className="col-md-3 item" key={item.id}>
                <div><img src={item.img} alt={item.product_name} /></div>
                <div><p>{item.product_name}</p></div>
                <div><p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p></div>
                <button
                  onClick={() => {
                    setFlag(!flag)
                    let Cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
                    let flag1 = Cart.find((checkItem) => checkItem.id == item.id);
                    if (!flag1) {
                      if (Cart.length == 0) {
                        Cart = [{
                          quantity: 1,
                          id: item.id,
                          price: item.price
                        }]
                      }
                      else {
                        Cart = [...Cart, {
                          quantity: 1,
                          id: item.id,
                          price: item.price
                        }]
                      }

                    } else {
                      flag1.quantity += 1
                    }
                    localStorage.setItem('cart', JSON.stringify(Cart));
                  }}
                ><i className="fa-solid fa-cart-shopping"></i>Thêm vào giỏ hàng</button>
              </div>
            )
          }
        )
      }
    </>
  )
}
