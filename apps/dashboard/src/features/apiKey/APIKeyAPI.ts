import requester from 'services/requester';
import { DEFAULT_LIMIT } from 'config';
import { APIKeyAPI } from './types';

const apiKeyAPI: APIKeyAPI = {
  getAPIKeys({ limit = DEFAULT_LIMIT, ...rest }: any) {
    return requester.get('/api_keys', { params: { limit, ...rest } } as any);
  },

  createAPIKey(apiKey) {
    return requester.post('/api_keys', apiKey);
  },

  updateAPIKey(apiKey) {
    return requester.put(`/api_keys/${apiKey.id}`, apiKey);
  },

  deleteAPIKey(id) {
    return requester.delete(`/api_keys/${id}`);
  },
};

export default apiKeyAPI;
