export const isValidObjectId = (value: string): boolean => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(value);
};
