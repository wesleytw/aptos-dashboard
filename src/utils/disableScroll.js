export const disableScroll = () => {
  // To get the scroll position of current webpage
  let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
  // if scroll happens, set it to the previous value
  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll);
  };
}

export const enableScroll = () => {
  window.onscroll = function () { };
}