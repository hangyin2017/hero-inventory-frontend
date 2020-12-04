
const debounce = (func, delay) => {
  let timer;
  
  return (...args) => {
    const context = this;
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

export default debounce;