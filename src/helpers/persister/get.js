const get = ({ key }) => {
  try {
    const value = localStorage.getItem(key);
    return { success: true, value };
  } catch (e) {
    // TODO: Log the error
    return { success: false };
  }
};

export default get;
