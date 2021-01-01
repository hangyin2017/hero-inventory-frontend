const throttle = (func, delay) => {
  let prev = Date.now();

  return (...args) => {
    const context = this;
    let now = Date.now();
    
    if(now - prev >= delay) {
      func.apply(context, args);
      prev = now;  
    }
  }
}

export default throttle;