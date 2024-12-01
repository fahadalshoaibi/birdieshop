import React, { useEffect, useState } from 'react'
const categories = ["Choose a category", "Electronics", "Toys", "Home", "Food", "Others"]
import ProductCards from '../products/productCards'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

const BestSellers = () => {
    const [products, setProducts]=useState([]) 
    const [selectedCategory, setSelectedCategory] = useState("Choose a category")
    useEffect(()=>{
        fetch("products.json").then(res=>res.json())
        .then((data)=>setProducts(data))
    },[])
    const filteredProducts = selectedCategory === "Choose a category" ? products : products.filter(product=>product.category === selectedCategory)
    console.log(filteredProducts)
  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>
            Best Sellers
        </h2>
      {/* category filter */}
      <div className='mb-8 flex items-center'>
        <select 
        onChange={(e)=>setSelectedCategory(e.target.value)}
        name="category" id ="category" className='border bg-[#EAEAEA] border-primary rounded-md px-4 py-2 focus:outline-none'>
            {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}

        </select>
      </div>

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
      filteredProducts.map((product, index) => (
        <SwiperSlide key={index}><ProductCards  product={product} /></SwiperSlide>
        
      ))
      }
        
        
      </Swiper>

      
    </div>
  )
}

export default BestSellers
