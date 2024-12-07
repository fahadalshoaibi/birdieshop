import React, { useEffect, useState } from 'react'
const categories = ["Choose a category", "Electronics", "Toys", "Home", "Food", "Others"]
import ProductCards from '../products/productCards'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  productAPI  from './features/product/productAPI';
import { useFetchProductsQuery } from './features/product/productAPI';


// import required modules
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

const ForYou = () => {
  const {data: products = []} = useFetchProductsQuery()
  console.log(products)
  return (
    <div>
      <h2 className='text-3xl font-semibold mb-6'>
            Selected For You
        </h2>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
      products.map((product, index) => (
        <SwiperSlide key={index}><ProductCards  product={product} /></SwiperSlide>
        
      ))
      }
        
        
      </Swiper>
    </div>
  )
}

export default ForYou
