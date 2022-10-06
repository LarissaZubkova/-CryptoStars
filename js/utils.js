const isEscapeKey = (evt) => evt.key === 'Escape';

const checkIsVarified = (element, user) => {
  if (!user.isVerified) {
    element.remove();
  }
};

const switchAttribute = (shownElement, hiddenElement) => {
  shownElement.removeAttribute('style');
  hiddenElement.setAttribute('style', 'display: none');
};

export {isEscapeKey, checkIsVarified, switchAttribute};
