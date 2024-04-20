import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addProduct } from '../Store/inventorySlice';

const ProductForm = ({ product: initialProduct = null, readOnly = false }) => {
  const dispatch = useDispatch();

  const initialValues = {
    id: initialProduct ? initialProduct.id : '',
    name: initialProduct ? initialProduct.name : '',
    category: initialProduct ? initialProduct.category : '',
    description: initialProduct ? initialProduct.description : '',
    image: initialProduct ? initialProduct.image : '',
    price: initialProduct ? initialProduct.price : '',
    discountPrice: initialProduct ? initialProduct.discountPrice : ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Image URL must be a valid URL').required('Image URL is required'),
    price: Yup.number().min(0, 'Price must be greater than or equal to 0').required('Price is required'),
    discountPrice: Yup.number().min(0, 'Discount Price must be greater than or equal to 0').required('Discount Price is required')
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addProduct(values));
    resetForm();
  };

  return (
    <div className="w-full">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <Field type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly={readOnly} />
            <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <Field type="text" id="category" name="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly={readOnly} />
            <ErrorMessage name="category" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <Field as="textarea" id="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly={readOnly} />
            <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <Field type="text" id="image" name="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly={readOnly} />
            <ErrorMessage name="image" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <Field type="number" id="price" name="price" min="0" placeholder="Price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly={readOnly} />
            <ErrorMessage name="price" component="div" className="text-red-500 text-xs italic" />
          </div>
          <div className="mb-4">
            <label htmlFor="discountPrice" className="block text-gray-700 text-sm font-bold mb-2">Discount Price</label>
            <Field type="number" id="discountPrice" name="discountPrice" min="0" placeholder="Discount Price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly={readOnly} />
            <ErrorMessage name="discountPrice" component="div" className="text-red-500 text-xs italic" />
          </div>
          {!readOnly && (
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default ProductForm;
