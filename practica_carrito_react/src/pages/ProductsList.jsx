import React from 'react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

export default function ProductsList({cart, setCart}) {

    const addProduct = (product) => {
        if(cart.some(item => item.id === product.id)){
            //actualizamos la cantidad
            setCart(cart.map(item => {
                if(item.id === product.id){
                    return {...item, quantity: item.quantity + 1}
                }else{
                    return item
                }
            }))
        }else{
            setCart([...cart, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            }])
        }
        
    }

    console.log(cart)

    return (
        <>
            <h1 className='my-4'>Desserts</h1>
            <section className='row'>
                {
                    products.map((product, index) => {
                        return (
                            <ProductCard product={product} key={index} addProduct={addProduct}/>
                        )
                    })
                }
            </section>
        </>
    )
}
