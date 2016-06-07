export function genRandomOption (datas, cur, retSize) {
  let length = datas.length;
  if (length - 1 < 2) {
    return;
  }
  let ret = [];
  while (ret.length < retSize) {
    let idx = Math.floor(Math.random() * length);
    if (idx < 0 || idx >= length) {
      continue;
    }
    if (datas[idx].id !== cur && !hasExist(datas, ret, idx)) {
      ret.push(idx);
    }
  }
  return ret;
}

function hasExist (datas, hasList, idx) {
  for (let i = 0; i < hasList.length; ++i) {
    if (datas[hasList[i]].id === datas[idx].id) {
      return true;
    }
  }
  return false;
}

export function randomSort (datas) {
  datas.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));
}

const animEndEventName = ((thisWindow, thisDocument) => {
  const prefix = (() => {
    const styles = thisWindow.getComputedStyle(thisDocument.documentElement, null);
    const prefixes = Array.prototype.slice.call(styles).join('');
    return (prefixes.match(/-(moz|webkit|ms)-/) || ['', 'o'])[1];
  })();
  const animEndEventNames = {
    'animation': 'animationend',
    'webkit': 'webkitAnimationEnd',
    'o': 'oAnimationEnd',
    'ms': 'MSAnimationEnd'
  };
  return animEndEventNames[prefix.lowercase] || animEndEventNames.animation;
})(window, document);


export function showAnimate (ele, animate) {
  ele.classList.add(animate);
  ele.setAttribute('data-anim', animate);
  ele.addEventListener(animEndEventName, removeAnimate.bind(ele), false);
}

export function removeAnimate () {
  const anim = this.getAttribute('data-anim');
  this.removeAttribute('data-anim');
  this.classList.remove(anim);
  this.removeEventListener(animEndEventName, removeAnimate.bind(this), false);
}
