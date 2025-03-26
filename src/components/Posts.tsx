import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../services/api';
import type { Post, PostsResponse } from '../types';
import { useState } from 'react';

export default function Posts() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { data: postsData, isLoading, error } = useQuery<PostsResponse, Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      try {
        const response = await postsApi.getAll();
        console.log('Posts response:', response);
        return response;
      } catch (err) {
        console.error('Error fetching posts:', err);
        throw err;
      }
    }
  });

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2rem)]">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-50/50 backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!postsData?.posts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No posts found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Latest Posts</h1>
          <p className="mt-2 text-gray-600">A list of all the posts in your account.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {postsData?.posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <svg className="h-5 w-5 text-indigo-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">
                      {typeof post.reactions === 'number' ? post.reactions : 0} reactions
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read More Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">{selectedPost.title}</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{selectedPost.body}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-gray-500">
                  <svg className="h-5 w-5 text-indigo-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">
                    {typeof selectedPost.reactions === 'number' ? selectedPost.reactions : 0} reactions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
