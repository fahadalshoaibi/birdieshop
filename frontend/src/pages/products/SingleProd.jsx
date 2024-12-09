import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetchProductQuery } from '../../redux/features/products/productAPI';
import { getImgUrl } from '../../utils/getUrl';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';


const SingleProd = () => {
    const {id} = useParams();
    const {data: product, isLoading, isError} = useFetchProductQuery(id);

    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{product.name}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(product.image)}`}
                        alt={product.name}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5 ' >
                    <p className="text-gray-700 mb-2"><strong>Description:</strong> {product.description }</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Price:</strong> ${product.price}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {product?.category}
                    </p>
                    <div className="text-gray-700">
  <strong>Reviews:</strong>
  {product.reviews.map((review, index) => (
    <p className = " border border-sm  rounded"key={index}>{review}</p>
  ))}
</div>
<div className="text-gray-700">
  <strong>Average Rating:</strong> {
    (product.ratings.reduce((sum, rating) => sum + Number(rating), 0) / product.ratings.length).toFixed(2)
  }
</div>


                </div>

                <button onClick={() => handleAddToCart(product)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
  )
}

export default SingleProd