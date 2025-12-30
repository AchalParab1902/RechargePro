import api from '../api/axios';

export const performRecharge = async (planId, mobileNumber) => {
  const { data } = await api.post('/user/recharge', { planId, mobileNumber });
  return data;
};
