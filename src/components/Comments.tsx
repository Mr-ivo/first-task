import { useQuery } from '@tanstack/react-query';
import { commentsApi } from '../services/api';
import { Comment } from '../types';
import { useState } from 'react';

// Avatar component with random background colors
const UserAvatar = ({ username }: { username: string }) => {
  const colors = [
    'bg-indigo-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div className={`h-10 w-10 rounded-full ${randomColor} flex items-center justify-center`}>
      <span className="text-white font-medium">
        {username?.[0]?.toUpperCase() ?? 'U'}
      </span>
    </div>
  );
};

export default function Comments() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError, error } = useQuery<{ comments: Comment[] }, Error>({
    queryKey: ['comments'],
    queryFn: commentsApi.getAll,
    retry: 2,
    refetchOnWindowFocus: false
  });

  // Filter comments based on search term
  const filteredComments = data?.comments?.filter(comment => 
    comment.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-gray-50/50 backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading comments</h3>
          <p className="mt-2 text-sm text-gray-600">{error?.message || 'Unknown error occurred'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Comments</h1>
            <p className="mt-1 text-gray-600">
              {filteredComments.length} {filteredComments.length === 1 ? 'comment' : 'comments'}
            </p>
          </div>
          <div className="w-full sm:w-64">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Search comments..."
                className="block w-full rounded-md border-gray-300 pl-4 pr-10 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            {searchTerm ? 'No matching comments found' : 'No comments available'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try a different search term' : 'Check back later for new comments'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex space-x-4"
            >
              <div className="flex-shrink-0">
                <UserAvatar username={comment.user?.username || 'Unknown'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {comment.user?.username || 'Anonymous'}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Post #{comment.postId}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{comment.body}</p>
                <div className="mt-3 flex items-center text-xs text-gray-500 space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-indigo-500">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Reply
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-red-500">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like
                  </button>
                  <span className="text-xs">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}