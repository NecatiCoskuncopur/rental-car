/**
 * A utility function to pick allowed keys from a source object
 * and apply trim() to string values.
 * @param {Object} source - The source object
 * @param {Array} allowedKeys - The list of allowed keys
 * @returns {Object} A new object containing only the allowed keys, with string values trimmed
 */
export const pickAllowedKeys = (source, allowedKeys) => {
  const result = {};

  allowedKeys.forEach((key) => {
    if (key in source) {
      const value = source[key];
      result[key] = typeof value === 'string' ? value.trim() : value;
    }
  });

  return result;
};
