import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api';
import { Product } from '../types';
import { useState } from 'react';
import { FiHeart, FiShoppingCart, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Products() {
  const { data, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ['products'],
    queryFn: productsApi.getAll
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-50/50 backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading products</h3>
          <p className="mt-2 text-sm text-gray-500">{(error as Error).message}</p>
          <div className="mt-5">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our amazing collection of products
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.products.map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative aspect-w-3 aspect-h-2">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-64 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                    <FiHeart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <button 
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <svg
                      className="h-5 w-5 text-gray-600 hover:text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                {product.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discountPercentage}%
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {product.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {product.discountPercentage > 0 ? (
                      <>
                        <span className="text-lg font-bold text-indigo-600">
                          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-indigo-600">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FiStar className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                  <button
                    disabled={product.stock <= 0}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                      product.stock > 0
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <FiShoppingCart className="mr-1.5 h-4 w-4" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{selectedProduct.title}</h2>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setCurrentImageIndex(0);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-3 rounded-xl shadow-md overflow-hidden">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                      )}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <FiChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        (prev + 1) % selectedProduct.images.length
                      )}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <FiChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {selectedProduct.images.map((image, index) => (
                      <div
                        key={index}
                        className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer ${
                          index === currentImageIndex ? 'ring-2 ring-indigo-500' : ''
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.title} ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Price</h4>
                      {selectedProduct.discountPercentage > 0 ? (
                        <>
                          <p className="text-2xl font-bold text-indigo-600">
                            ${(selectedProduct.price * (1 - selectedProduct.discountPercentage / 100)).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            ${selectedProduct.price.toFixed(2)}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                            {selectedProduct.discountPercentage}% OFF
                          </span>
                        </>
                      ) : (
                        <p className="text-2xl font-bold text-indigo-600">
                          ${selectedProduct.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Availability</h4>
                      <p className={`text-lg font-semibold ${
                        selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedProduct.stock} units available
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Rating</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <FiStar
                              key={index}
                              className={`h-5 w-5 ${
                                index < Math.floor(selectedProduct.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-lg font-semibold text-gray-900">
                          {selectedProduct.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Brand</h4>
                      <p className="text-lg font-semibold text-gray-900">{selectedProduct.brand}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      
                      // Add to cart logic
                      setSelectedProduct(null);
                      setCurrentImageIndex(0);
                    }}
                    disabled={selectedProduct.stock <= 0}
                    className={`w-full py-3 px-4 rounded-lg font-medium ${
                      selectedProduct.stock > 0
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors flex items-center justify-center`}
                  >
                    <FiShoppingCart className="mr-2 h-5 w-5" />
                    {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}