const set = ({ key, value }) => {
  if (!key || !value) return { success: false };

  try {
    localStorage.setItem(key, value);
    return { success: true };
  } catch (e) {
    // TODO: Log the error
    return { success: false };
  }
};

export default set;
