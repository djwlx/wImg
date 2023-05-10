const useLocalStorage = () => {
  const get = (key: string) => {
    localStorage.getItem(key);
  };

  const set = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
  };

  const clear = () => {
    localStorage.clear();
  };

  return {
    get,
    set,
    remove,
    clear,
    localStorage: localStorage,
  };
};
export default useLocalStorage;
