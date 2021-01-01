const debounce = (func, delay) => {
  let timer;
  
  return (...args) => new Promise((resolve) => {
    const context = this;

    if(timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
      const result = func.apply(context, args);
      resolve(result);
    }, delay);
  });
}

export default debounce;