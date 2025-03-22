import { useQueries } from '@tanstack/react-query';
import { productsApi, postsApi, commentsApi } from '../services/api';
import { Product, Post, PostsResponse, ProductsResponse, CommentsResponse } from '../types';
import { Link } from 'react-router-dom';



export default function Dashboard() {


  const [
    { data: productsData, isLoading: isLoadingProducts, error: productsError },
    { data: postsData, isLoading: isLoadingPosts, error: postsError },
    { data: commentsData, isLoading: isLoadingComments, error: commentsError }
  ] = useQueries<[ProductsResponse, PostsResponse, CommentsResponse]>({
    queries: [
      {
        queryKey: ['products'],
        queryFn: productsApi.getAll,
      },
      {
        queryKey: ['posts'],
        queryFn: postsApi.getAll,
      },
      {
        queryKey: ['comments'],
        queryFn: commentsApi.getAll,
      }
    ]
  });

  const isLoading = isLoadingProducts || isLoadingPosts || isLoadingComments;

  // Handle errors
  if (productsError || postsError || commentsError) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-red-200/50 shadow-sm p-6 max-w-lg w-full">
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium">Error Loading Dashboard</h3>
          </div>
          <p className="text-gray-600 text-sm">
            {productsError?.message || postsError?.message || commentsError?.message || 'An error occurred while loading the dashboard data.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gray-50/50 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats: Array<{
    name: string;
    value: number;
    to: string;
    icon: JSX.Element;
  }> = [
    {
      name: 'Total Products',
      value: (productsData as ProductsResponse)?.total || 0,
      to: '/products',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      )
    },
    {
      name: 'Total Posts',
      value: (postsData as PostsResponse)?.total || 0,
      to: '/posts',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
        </svg>
      )
    },
    {
      name: 'Total Comments',
      value: (commentsData as CommentsResponse)?.total || 0,
      to: '/comments',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main content */}
      <div>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-8">
            <div className="flex items-center flex-1">

              <h2 className="text-lg font-medium">Overview</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200 relative">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <main className="p-4 lg:p-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => (
              <Link
                to={stat.to}
                key={stat.name}
                className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                      {stat.name}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md group-hover:bg-gray-200 transition-colors duration-200">
                    <div className="text-gray-900">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Latest Products</h3>
                <p className="text-sm text-gray-500 mt-1">Recent additions to our product catalog</p>
              </div>
              <div className="divide-y divide-gray-200/50">
                {(productsData as ProductsResponse)?.products?.slice(0, 5)?.map((product: Product) => (
                  <div key={product.id} className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="flex items-center space-x-4 group">
                      <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-200"></div>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="relative w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.title}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-sm font-medium text-indigo-600">${product.price}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            {product.stock} in stock
                          </span>
                          <div className="flex items-center text-yellow-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs ml-1 font-medium">{product.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/products/${product.id}`}
                        className="flex-shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View
                        <span className="sr-only">, {product.title}</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <Link
                  to="/products"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center"
                >
                  View all products
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" className="transform group-hover:translate-x-1 transition-transform duration-200" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">Latest Posts</h3>
                <p className="text-sm text-gray-500 mt-1">Recent discussions and updates</p>
              </div>
              <div className="divide-y divide-gray-200/50">
                {(postsData as PostsResponse)?.posts?.slice(0, 5)?.map((post: Post) => (
                  <div key={post.id} className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{post.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.body}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {typeof post.reactions === 'number' ? `${post.reactions} reactions` : '0 reactions'}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <Link
                  to="/posts"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center"
                >
                  View all posts
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" className="transform group-hover:translate-x-1 transition-transform duration-200" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
