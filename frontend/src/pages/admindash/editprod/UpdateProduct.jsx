import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProductQuery, useUpdateProductMutation } from '../../../redux/features/products/productAPI';
import Inputf from '../addproduct/Inputf';
import Selectf from '../addproduct/Selectf';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseUrl';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, isLoading, isError, refetch } = useFetchProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (productData) {
      setValue('name', productData.name);
      setValue('description', productData.description);
      setValue('category', productData.category);
      setValue('price', productData.price);
      setValue('image', productData.image);
    }
  }, [productData, setValue]);

  const onSubmit = async (data) => {
    const updateProductData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      image: data.image || productData.image,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/products/edit/${id}`, updateProductData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      Swal.fire({
        title: "Product Updated",
        text: "Your Product is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch();
      navigate('/dashboard/manage-products');
    } catch (error) {
      console.log("Failed to update Product.");
      alert("Failed to update Product.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Product data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputf
          label="name"
          name="name"
          placeholder="Enter product name"
          register={register}
        />
        <Inputf
          label="description"
          name="description"
          placeholder="Enter product description"
          type="textarea"
          register={register}
        />
        <Selectf
          label="category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'Food', label: 'Food' },
            { value: 'Home', label: 'Home' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Toys', label: 'Toys' },
            { value: 'Others', label: 'Others' },
          ]}
          register={register}
        />
        <Inputf
          label="price"
          name="price"
          type="number"
          placeholder="Price"
          register={register}
        />
        <Inputf
          label="image"
          name="image"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;