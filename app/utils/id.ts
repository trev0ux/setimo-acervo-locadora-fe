export const generateId = (): string => {
  return crypto.randomUUID();
};

export const generateShortId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
