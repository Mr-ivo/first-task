import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../services/api';
import { Product } from '../types';

export default function Products() {
  const { data, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ['products'],
    queryFn: productsApi.getAll
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading products: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.products.map((product) => (
        <div
          key={product.id}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="aspect-w-3 aspect-h-2">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover w-full h-48"
            />
          </div>
          <div className="px-4 py-4">
            <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-lg font-bold text-indigo-600">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500">Rating:</span>
              <span className="ml-1 text-sm font-medium text-gray-900">
                {product.rating}/5
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
