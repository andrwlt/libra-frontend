export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required.';
  }

  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
    return 'Invalid email.';
  }

  return true;
};
