import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  getBaseUrl  from '../../../utils/baseUrl';
const baseQuery = fetchBaseQuery({baseUrl : `${getBaseUrl()}/api/products`,
credentials : 'include',
prepareHeaders: (headers) => {
const token = localStorage.getItem('token');
if (token) {
    headers.set('authorization', `Bearer ${token}`);
}
return headers;
},
});




const productAPI = createApi({
    reducerPath: 'productAPI',  
    baseQuery,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => '/',
            providesTags: ['Products'],
        })
    })
});
export const { useFetchProductsQuery } = productAPI;   
export default productAPI;