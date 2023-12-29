const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

const changeTabFocus = function (e) {
  const keyDownLeft = 37;
  const keyDownRight = 39;

  // change the tabindex of the current tab to -1
  if (e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
    e.target.setAttribute("tabindex", "-1");
    e.target.setAttribute("aria-selected", "false");
  }

  if (e.keyCode === keyDownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) tabFocus = 0;
  }

  if (e.keyCode === keyDownLeft) {
    tabFocus--;
    if (tabFocus <= -1) tabFocus = tabs.length - 1;
  }

  tabs[tabFocus].setAttribute("tabindex", "0");
  tabs[tabFocus].setAttribute("aria-selected", "true");
  tabs[tabFocus].focus();
};

tabList.addEventListener("keydown", changeTabFocus);
