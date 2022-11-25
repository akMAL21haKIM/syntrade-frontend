export const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
