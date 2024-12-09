import React, { useState } from 'react'
import Inputf from './Inputf'

import Selectf from './Selectf'
import { useForm } from 'react-hook-form';
import { useAddProductMutation } from '../../../redux/features/products/productAPI';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addProduct, {isLoading, isError}] = useAddProductMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {
 
        const newProductData = {
            ...data,
            image: imageFileName
        }
        try {
            await addProduct(newProductData).unwrap();
            Swal.fire({
                title: "Product added",
                text: "Your Product is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add Product. Please try again.")   
        }
      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <Inputf
          label="name"
          name="name"
          placeholder="Enter Product title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <Inputf
          label="description"
          name="description"
          placeholder="Enter Product description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <Selectf
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'Food', label: 'Food' },
            { value: 'Home', label: 'Home' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Toys', label: 'Toys' },
            { value: 'Others', label: 'Others' },
            // Add more options as needed
          ]}
          register={register}
        />

      

        {/* Price */}
        <Inputf
          label="Price"
          name="Price"
          type="number"
          placeholder="Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add product</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddProduct