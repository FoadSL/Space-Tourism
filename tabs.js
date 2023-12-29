const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const pictures = document.querySelectorAll("picture");
const articles = document.querySelectorAll("article");

console.log(Array.from(tabs));

let tabFocus = 0;

const changeContent = function (index) {
  pictures.forEach((tab) => tab.setAttribute("hidden", ""));
  pictures[index].removeAttribute("hidden");

  articles.forEach((article) => article.setAttribute("hidden", ""));
  articles[index].removeAttribute("hidden");
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

  changeContent(tabFocus);
};

tabList.addEventListener("keydown", changeTabFocus);
tabList.addEventListener("click", function (e) {
  const clickedTab = e.target.closest('[role="tab"]');
  if (!clickedTab) return;

  const prevTab = Array.from(tabs).find(
    (tab) => tab.attributes.tabIndex.value === "0"
  );
  prevTab.setAttribute("tabindex", "-1");
  prevTab.setAttribute("aria-selected", "false");

  const tabIndex = Array.from(tabs).findIndex((tab) => tab === clickedTab);
  changeContent(tabIndex);

  tabs[tabIndex].setAttribute("tabindex", "0");
  tabs[tabIndex].setAttribute("aria-selected", "true");
  tabs[tabIndex].focus();
});
