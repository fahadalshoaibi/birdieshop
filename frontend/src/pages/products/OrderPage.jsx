import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/orderAPI';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching orders</div>;

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-mono mb-4'>Orders</h2>
            {orders.length === 0 ? (
                <div>No orders found</div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={order._id} className='bg-white p-4 rounded-lg shadow-md mb-4'>
                            <h3 className='text-lg font-semibold mb-2'>Order ID: {order._id}</h3>
                            <p className='text-gray-600 mb-2'>Total Price: ${order.totalPrice}</p>
                            <p className='text-gray-600 mb-2'>Items: {order.productIds.length}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;