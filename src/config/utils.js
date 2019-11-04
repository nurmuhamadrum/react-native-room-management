export const getTimeDiffMin = date => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();

  return Math.round(diff / 60000);
};

export const getTimeDiffSec = date => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();

  return Math.round(diff / 1000);
};

export const Fonts = {
  MontSerrat: 'Montserrat-Regular',
  MontSerratBold: 'Montserrat-Bold',
};
