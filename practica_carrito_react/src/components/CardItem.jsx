import React from 'react'

export default function CardItem({item, deleteItem}) {

    const {id, name, price, quantity} = item
    const subTotal = price * quantity

    return (
        <section>
            <div className='border-bottom pb-2 mb-2'>
                <p className='fw-bold m-0'>{name}</p>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between'>
                        <p className='text-danger pe-3'>{quantity}X</p>
                        <p className='pe-3 text-secondary'>@ ${price}</p>
                        <p className='text-secondary fw-bold'>${subTotal}</p>
                    </div>
                    <button className='rounded-circle btn btn-secondary btn-sm' onClick={() => deleteItem(item)}>X</button>
                </div>
            </div>
        </section>
    )
}
