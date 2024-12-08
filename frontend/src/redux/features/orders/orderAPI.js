import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  getBaseUrl  from '../../../utils/baseUrl';



const orderAPI = createApi({
 reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials:'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: (builder.mutation) ({
            query: (newOrder) => ({
                url : '/',
                method: 'POST',
                body: newOrder,
                credentials: 'include',
                

        })
    })
    })
})
export const { useCreateOrderMutation } = orderAPI
export default orderAPI
