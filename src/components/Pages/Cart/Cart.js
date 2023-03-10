import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteCartProductByIdMutation, useGetCartProductByEmailQuery } from '../../../features/products/productsSlice';
import Loader from '../../Shared/Loader/Loader';
import CartProduct from '../CartProduct/CartProduct';

const Cart = () => {
    const [checkedCarts, setCheckedCarts] = useState([]);

    const { user } = useSelector(state => state.auth)
    const { data: cartProducts, isLoading, isError } = useGetCartProductByEmailQuery(user?.email, { refetchOnMountOrArgChange: true, refetchOnFocus: true });

    const [deleteFromCart, { data }] = useDeleteCartProductByIdMutation();

    if (isLoading) {
        <div className='h-screen flex justify-center items-center'>
            <Loader />
        </div>
    };

    const deleteProductFromCart = (productId) => {
        deleteFromCart(productId);
    };


    console.log(checkedCarts);
    // const handleCheckedCartProduct = (cartProduct) => {
    //     // const withNewChecked = [...checkedCarts, cartProduct];
    //     // setCheckedCarts(withNewChecked)
    //     setCheckedCarts([...checkedCarts, cartProduct])
    //     console.log(checkedCarts);
    // }


    return (
        <div className='mt-6'>
            <h3 className='text-center text-primary font-bebas text-2xl tracking-widest mb-4'>My Cart</h3>

            {
                cartProducts?.length < 1 &&
                <h5 className='text-center mt-10 text-lg'>Your cart is empty. Please <Link to="/store" className='underline font-medium text-blue'>add to cart</Link> something.</h5>
            }

            <div className='flex lg:pl-28 lg:flex-row md:flex-row flex-col-reverse gap-y-10'>
                <div className='grid gap-y-4 px-2 lg:w-[60%] md:w-[60%]'>
                    {
                        cartProducts?.map(cartProduct =>
                            <CartProduct
                                key={cartProduct._id}
                                cartProduct={cartProduct}
                                deleteProductFromCart={deleteProductFromCart}
                                // handleCheckedCartProduct={handleCheckedCartProduct}
                                checkedCarts={checkedCarts}
                                setCheckedCarts={setCheckedCarts}
                            />
                        )
                    }
                </div>
                <div className='border-primary flex-1 font-bebas text-primary px-2'>
                    <div className='border lg:w-1/2 md:w-2/3 p-2 px-4 flex flex-col gap-y-4'>
                        <h3 className='text-lg tracking-widest'>Order Summary</h3>
                        <div className='flex flex-col gap-y-2'>
                            <div className='flex justify-between'>
                                <p>Total items:</p>
                                <span>{checkedCarts?.length}</span>
                            </div>
                            <div className='flex justify-between'>
                                <p>Price:</p>
                                <span>${200}.00</span>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping Fee:</p>
                                <span>${20}.00</span>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type="text"
                                    className='w-full py-0.5 px-2 focus:outline-primary bg-gray-light'
                                    placeholder='Enter your voucher'
                                />
                                <button className='bg-primary hover:bg-secondary active:bg-opacity-80 transition-all py-0.5 text-white px-5 tracking-wider'>Apply</button>
                            </div>
                            <div className='flex justify-between'>
                                <p>Subtotal:</p>
                                <span>${220}.00</span>
                            </div>
                        </div>
                        <Link className='flex justify-center bg-primary hover:bg-secondary active:bg-opacity-80 transition-all duration-200 font-medium font-bebas tracking-widest text-white py-1'>
                            Proceed To Checkout
                        </Link>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Cart;