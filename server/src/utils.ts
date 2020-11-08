export const getExpireDate = () => {
  // Returns first day of next month.
  const today = new Date();
  const expireAt = new Date(`${today.getFullYear()}-${today.getMonth() + 2}`);
  const expireAtSec = expireAt.getTime() / 1000;
  return expireAtSec;
};
