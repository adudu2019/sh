const Short = (str, maxLength, trunc) => {
  if (str.length > maxLength) {
    return `${str.substring(0, trunc)}...`;
  } else {
    return str;
  }
};

export default Short;
