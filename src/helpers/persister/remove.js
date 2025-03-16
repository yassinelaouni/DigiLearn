const remove = ({ key }) => {
  try {
    localStorage.removeItem(key);
    return { success: true };
  } catch (e) {
    // TODO: Log the error
    return { success: false };
  }
};

export default remove;
