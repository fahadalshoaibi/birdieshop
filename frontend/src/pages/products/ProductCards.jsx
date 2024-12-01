import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { getImgUrl } from '../../utils/getUrl';
import './images.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice.js'; // Adjust the path as necessary


const ProductCards = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/products/${product._id}`}>
            <img
              src={getImgUrl(product.image)}
              alt={product.name}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200 product-image"
            />
          </Link>
        </div>
        <div>
          <Link to={`/products/${product._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {product.description.length > 70 ? `${product.description.slice(0, 70)}...` : product.description}
          </p>
          <p className="font-medium mb-5">
            ${product.price} <span className="line-through font-normal ml-2">${product.price * 2}</span>
          </p>
          <button 
                    onClick={() => addToCartHandler(product)}
                    className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                        <IoCartOutline className="" />
                        <span>Add to Cart</span>
                    </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
