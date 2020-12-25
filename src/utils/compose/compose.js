const compose = (...fns) => (component) => fns.reduce((enhanced, fn) => fn(enhanced), component);

export default compose;