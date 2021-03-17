const useHttp = async (url, method = "GET", body = null, headers = {}) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`http://127.0.0.1:8000${url}`, {
      method,
      body,
      headers
    });
    return await response;
  } catch (e) {
    throw new Error(e.message || "Error system...");
  }
};

export default useHttp;
