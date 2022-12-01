import { posts } from '@/api/index';

export function getPosts(params) {
  return posts.get('/', { params });
}

export function getPostById(id) {
  return posts.get(String(id));
}

export function createPost(data) {
  return posts.post('', data);
}

// export function updatePost(id, data) {
//   return posts.put(String(id), data);
// }

export function updatePost(id, data) {
  return posts.patch(String(id), data);
}

export function deletePost(id) {
  return posts.delete(`/${id}`);
}
