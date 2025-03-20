import React from 'react'
import { FaCartPlus } from 'react-icons/fa'

export default function ProductCard({product, addProduct}) {
    //desestructuracion de datos
    const {name, category, price, image} = product

    return (
        <div className='col-md-4'>
            <div className='mb-4'>
                <img src={image} alt={name} className='img-fluid rounded'/>
                <p className='fw-light pt-2 m-0'>{category}</p>
                <p className='m-0 fw-bold'>{name}</p>
                <p className='fw-bold text-danger'>${price}</p>
                <div className='text-center'>
                    <button className='btn btn-light border-danger fw-bold' onClick={() => addProduct(product) }><FaCartPlus/> Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
