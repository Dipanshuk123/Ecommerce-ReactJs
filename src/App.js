import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import './index.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Provider store={store}>
      <div className="bg-gray-200 min-h-screen">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">Product Management</h1>
        </header>
        <div className="container mx-auto py-8 px-4">
          <button
            onClick={toggleModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add Product
          </button>
          {isModalOpen && (
            <div id="default-modal" tabIndex="-1" aria-hidden={!isModalOpen} className={`fixed inset-0 z-50 overflow-y-auto overflow-x-hidden ${isModalOpen ? '' : 'hidden'}`}>
              {/* Your modal content goes here */}
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Add Product
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={toggleModal}>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-4 md:p-5 space-y-4">
                    {/* Your form content goes here */}
                    <ProductForm />
                  </div>
                </div>
              </div>
            </div>
          )}
          <h2 className="text-xl font-bold mt-8">Product Listing</h2>
          <div className="overflow-x-auto">
            <ProductTable />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
