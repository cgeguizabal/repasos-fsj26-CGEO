import React, { useState } from 'react'
import CardItem from '../components/CardItem'

export default function CartList({cart, setCart}) {
    let subTotal = 0
    let total = 0

    const deleteItem = (product) => {
        if(cart.some(item => item.id === product.id)){
            if(product.quantity > 1){
                setCart(cart.map(item => {
                    if(item.id === product.id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                }))
            }else{
                setCart(cart.filter(item => item.id !== product.id))
            }
        }
    }

    return (
        <div>
            <h2 className='text-danger my-4'>Your Cart(0)</h2>
            <section className='mb-4'>
                {
                    cart.map((item, index) => {
                        subTotal = item.price * item.quantity
                        total += subTotal

                        return (
                            <CardItem key={index} item={item} deleteItem={deleteItem} />
                        )
                    })
                }
                <div className='d-flex justify-content-between'>
                    <p>Order Total</p>
                    <h4>${total}</h4>
                </div>
                <div className='text-center'>
                    <button className='btn btn-danger'>Confirm Order</button>
                </div>
            </section>
        </div>
    )
}
