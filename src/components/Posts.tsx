import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../services/api';
import type { Post, PostsResponse } from '../types';
import { useAuth } from '../contexts/AuthContext';

export default function Posts() {
  const { isAuthenticated } = useAuth();
  console.log('Auth state:', { isAuthenticated, token: localStorage.getItem('token') });
  const { data, isLoading, error } = useQuery<PostsResponse, Error>({
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  console.log('Posts data:', data);
  
  if (!data?.posts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No posts found</div>
      </div>
    );
  }



  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Latest Posts
          </h1>
          <p className="mt-1 text-sm text-gray-500">A list of all the posts in your account.</p>
        </div>
      <div className="grid gap-6">
        {data?.posts.map((post: Post) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{post.body}</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">
                    {typeof post.reactions === 'number' 
                      ? `${post.reactions} reactions`
                      : `${post.reactions.likes} likes, ${post.reactions.dislikes} dislikes`
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
