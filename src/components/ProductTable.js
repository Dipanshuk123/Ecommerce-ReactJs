import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateDiscountPercentage, editProduct, deleteProduct  , updateProductStatus} from '../Store/inventorySlice';
import ProductForm from './ProductForm';

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  console.log("dk" , products);

  const [editedProductId, setEditedProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    products.forEach(product => {
      dispatch(calculateDiscountPercentage({ productId: product.id, discountPrice: product.discountPrice }));
    });
  }, [dispatch]);

  const handleEdit = (productId, product) => {
    setEditedProductId(productId);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = () => {
    dispatch(editProduct({ productId: editedProduct.id, updatedProduct: editedProduct }));
    setEditedProductId(null);
    setEditedProduct({});
  };

  const handleCancelEdit = () => {
    setEditedProductId(null);
    setEditedProduct({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const handleDelete = (productId) => {
    // Filter out the product with the specified productId
   
    dispatch(deleteProduct(productId));
  };

  const handleStatusChange = (productId, status) => {
    dispatch(updateProductStatus({ productId, status }));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount Percentage
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {editedProductId === product.id ? (
                  <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
                ) : (
                  product.name
                )}
              </td>
              <td className="px-6 py-4">
                {editedProductId === product.id ? (
                  <input type="text" name="category" value={editedProduct.category} onChange={handleInputChange} />
                ) : (
                  product.category
                )}
              </td>
              <td className="px-6 py-4">
                {editedProductId === product.id ? (
                  <input type="text" name="description" value={editedProduct.description} onChange={handleInputChange} />
                ) : (
                  product.description
                )}
              </td>
              <td className="px-6 py-4">
                {product.price}
              </td>
              <td className="px-6 py-4">
                {editedProductId === product.id ? (
                  <input type="number" name="discountPrice" value={editedProduct.discountPrice} onChange={handleInputChange} />
                ) : (
                  product.discountPrice
                )}
              </td>
              <td className="px-6 py-4">
                {product.discountPercentage}%
              </td>
              <td className="px-6 py-4">
                {product.discountPercentage > 0 ? 'On Sale' : 'Regular Price'}
              </td>
              <td className="px-6 py-4">
                <select value={product.status} onChange={(e) => handleStatusChange(product.id, e.target.value)} disabled={editedProductId === product.id}>
                  <option value="Active">Active</option>
                  <option value="Deactivated">Deactivated</option>
                </select>
              </td>
              <td className="px-6 py-4">
                {editedProductId === product.id ? (
                  <div>
                    <button onClick={handleSaveEdit} className="text-blue-600 dark:text-blue-500 hover:underline">Save</button>
                    <button onClick={handleCancelEdit} className="text-blue-600 dark:text-blue-500 hover:underline ml-2">Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(product.id, product)} className="text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleView(product)} className="text-blue-600 dark:text-blue-500 hover:underline ml-2">View</button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 dark:text-red-500 hover:underline ml-2">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-gray-800 bg-opacity-75">
          <div className="relative w-full max-w-2xl mx-auto my-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Product Details
                </h3>
                <button type="button" onClick={() => setViewModalOpen(false)} className="text-gray-400 hover:text-gray-500 dark:text-gray-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <ProductForm product={selectedProduct} readOnly={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
