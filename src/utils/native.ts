export const isFunction = (fn: any): boolean => {
  return typeof fn === 'function';
};

export const strToInt = (str: string | number, defaultVal = 0): number => {
  const amount = parseInt(String(str), 10);
  return Number.isNaN(amount) ? defaultVal : amount;
};
