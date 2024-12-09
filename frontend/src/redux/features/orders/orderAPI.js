import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

const ordersAPI = createApi({
  reducerPath: 'ordersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ['Orders'],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersAPI;
export default ordersAPI;