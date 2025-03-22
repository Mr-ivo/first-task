import { useQuery } from '@tanstack/react-query';
import { commentsApi } from '../services/api';
import { Comment } from '../types';

export default function Comments() {
  const { data, isLoading, error } = useQuery<{ comments: Comment[] }>({
    queryKey: ['comments'],
    queryFn: commentsApi.getAll
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
        Error loading comments: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow rounded-lg p-4 flex space-x-4"
        >
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-medium">
                {comment.user.username[0].toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {comment.user.username}
            </p>
            <p className="text-sm text-gray-500">{comment.body}</p>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span>Post ID: {comment.postId}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
