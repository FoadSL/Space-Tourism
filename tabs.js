const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

const hideContent = function (container, selector) {
  container
    .querySelectorAll(selector)
    .forEach((item) => item.setAttribute("hidden", ""));
};

const showContent = function (container, selector) {
  container.querySelector(selector).removeAttribute("hidden");
};

const changeTabPanel = function (targetTab) {
  const tabContainer = targetTab.parentElement;
  const mainContainer = tabContainer.parentElement;

  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  hideContent(mainContainer, "picture");
  showContent(mainContainer, `#${targetImage}`);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, `#${targetPanel}`);

  const curTab = tabContainer.querySelector('[aria-selected="true"]');

  curTab.setAttribute("tabindex", "-1");
  curTab.setAttribute("aria-selected", "false");

  targetTab.setAttribute("tabindex", "0");
  targetTab.setAttribute("aria-selected", "true");
};

const changeTabFocus = function (e) {
  const keyDownLeft = 37;
  const keyDownRight = 39;

  if (e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
    e.target.setAttribute("tabindex", "-1");
    e.target.setAttribute("aria-selected", "false");

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
  }
};

tabList.addEventListener("keydown", changeTabFocus);

tabList.addEventListener("click", function (e) {
  const targetTab = e.target.closest('[role="tab"]');
  if (targetTab) changeTabPanel(targetTab);
});
