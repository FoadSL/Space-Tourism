const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

console.log(Array.from(tabs));

let tabFocus = 0;

const changeContent = function (targetTab) {
  const mainContainer = targetTab.parentElement.parentElement;
  const tabPanels = mainContainer.querySelectorAll('[role="tabpanel"');
  const pictures = mainContainer.querySelectorAll("picture");

  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  pictures.forEach((picture) => picture.setAttribute("hidden", ""));
  mainContainer.querySelector(`#${targetImage}`).removeAttribute("hidden");

  tabPanels.forEach((tab) => tab.setAttribute("hidden", ""));
  mainContainer.querySelector(`#${targetPanel}`).removeAttribute("hidden");
};

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

  changeContent(tabs[tabFocus]);
};

tabList.addEventListener("keydown", changeTabFocus);

tabList.addEventListener("click", function (e) {
  const targetTab = e.target.closest('[role="tab"]');
  if (!targetTab) return;

  const prevTab = Array.from(tabs).find(
    (tab) => tab.attributes.tabindex.value === "0"
  );
  prevTab.setAttribute("tabindex", "-1");
  prevTab.setAttribute("aria-selected", "false");

  targetTab.setAttribute("tabindex", "0");
  targetTab.setAttribute("aria-selected", "true");
  targetTab.focus();

  changeContent(targetTab);
});
