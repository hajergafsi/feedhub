import apiClient from '.';

const registerVisitor = () => apiClient().post('/statistics/visit');

export const statisticsApi = {registerVisitor};
