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
        }),
        fetchProduct: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: 'Products', id}]
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: `/create-product`,
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: ({id, updatedProduct}) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: updatedProduct,
                headers :{'Content-Type': 'application/json'}
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        })
    })

});
export const { useFetchProductsQuery,useFetchProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productAPI;   
export default productAPI;