const axiosMock = {
  get: jest.fn().mockResolvedValue({ data: {}, headers: {} }),
  post: jest.fn().mockResolvedValue({ data: {}, headers: {} }),
  put: jest.fn().mockResolvedValue({ data: {}, headers: {} }),
  request: jest.fn().mockResolvedValue({ data: {}, headers: {} }),
  delete: jest.fn().mockResolvedValue({ data: {}, headers: {} }),
  interceptors: {
    request: { use: jest.fn(), },
    response: { use: jest.fn(), },
  },
};
axiosMock.create = () => axiosMock
export default axiosMock;
