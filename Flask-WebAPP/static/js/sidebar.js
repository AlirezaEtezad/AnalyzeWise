(function () {
  const body = document.querySelector("body");
  const wrapper = document.querySelector(".page-wrapper");
  // Get all the sidebar-list elements
  const sidebarListItems = document.querySelectorAll(".sidebar-link");
  // Add onclick event listener to each sidebar-list item
  sidebarListItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      const submenu = item
        .closest(".sidebar-list")
        .querySelector(".sidebar-submenu");
      if (submenu) {
        submenu.style.display = item.classList.contains("active")
          ? "block"
          : "none";
      }
      sidebarListItems.forEach((otherList) => {
        if (otherList !== item) {
          otherList.classList.remove("active");
          const otherSubmenu = otherList
            .closest(".sidebar-list")
            .querySelector(".sidebar-submenu");
          if (otherSubmenu) {
            otherSubmenu.style.display = "none";
          }
        }
      });
    });
  });
  // Get all the submenu-title elements
  const submenuTitles = document.querySelectorAll(".submenu-title");
  // Add onclick event listener to each submenu-title item
  submenuTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const parentLi = title.closest("li");
      parentLi.classList.toggle("active");
      const submenu = parentLi.querySelector(".according-submenu");
      if (submenu) {
        submenu.style.display =
          submenu.style.display === "block" ? "none" : "block";
      }
      submenuTitles.forEach((otherTitle) => {
        if (otherTitle !== title) {
          const otherParentLi = otherTitle.closest("li");
          const otherSubmenu =
            otherParentLi.querySelector(".according-submenu");
          if (otherSubmenu) {
            otherSubmenu.style.display = "none";
          }
          otherParentLi.classList.remove("active");
        }
      });
    });
  });
  var url = window.location.href;
  const urlLink = url.includes("#") ? url.split("#")[0] : url;
  const submenuLinks = document.querySelectorAll(".sidebar-menu li a");
  submenuLinks.forEach((el) => {
    var linkHref = el.href;
    if (urlLink === linkHref) {
      el.classList.add("active");
      const submenu = el.closest(".sidebar-submenu");
      if (submenu && submenu.previousElementSibling) {
        submenu.previousElementSibling.classList.add("active");
      }
      if (submenu) {
        submenu.style.display = "block";
      }
      const parentLi = el.closest(".sidebar-submenu > li");
      if (parentLi) {
        parentLi.classList.add("active");
        const submenu = parentLi.querySelector(".according-submenu");
        if (submenu) {
          submenu.style.display = "block";
        }
      }
    }
  });
  const sidebarClose = document.querySelector(".sidebar-close");
  if (sidebarClose) {
    sidebarClose.addEventListener("click", function () {
      wrapper.classList.add("sidebar-close");
      Overlay.classList.remove("active");
    });
  }
  // Sidebar toggle js
  const sidebarToggle = document.querySelector(".toggle-sidebar");
  sidebarToggle.addEventListener("click", function () {
    wrapper.classList.toggle("sidebar-close");
    sidebarToggle.classList.toggle("close");
    const wrapperClose = wrapper.classList.contains("sidebar-close");
  });
  // Sidebar pinned menu
  const pinTitle = document.querySelector(".pin-title");
  let pinIcon = document.querySelectorAll(".sidebar-list .pinned-icon");
  function togglePinnedName() {
    if (document.getElementsByClassName("pined").length) {
      if (!pinTitle.classList.contains("show")) pinTitle.classList.add("show");
    } else {
      pinTitle.classList.remove("show");
    }
  }
  pinIcon.forEach((item, index) => {
    var linkName = item.parentNode.querySelector("span").innerHTML;
    var InitialLocalStorage = JSON.parse(localStorage.getItem("pins") || false);
    if (InitialLocalStorage && InitialLocalStorage.includes(linkName)) {
      item.parentNode.classList.add("pined");
    }
    item.addEventListener("click", (event) => {
      var localStoragePins = JSON.parse(localStorage.getItem("pins") || false);
      item.parentNode.classList.toggle("pined");
      if (localStoragePins?.length) {
        if (item.parentNode.classList.contains("pined")) {
          !localStoragePins?.includes(linkName) &&
            (localStoragePins = [...localStoragePins, linkName]);
        } else {
          localStoragePins?.includes(linkName) &&
            localStoragePins.splice(localStoragePins.indexOf(linkName), 1);
        }
        localStorage.setItem("pins", JSON.stringify(localStoragePins));
      } else {
        localStorage.setItem("pins", JSON.stringify([linkName]));
      }
      var elem = item;
      var topPos = elem.offsetTop;
      togglePinnedName();
      setTimeout(() => {
        if (item.parentElement.parentElement.classList.contains("pined")) {
          scrollTo(
            document.getElementsByClassName("sidebar-menu")[0],
            topPos - 30,
            600
          );
        } else {
          scrollTo(
            document.getElementsByClassName("sidebar-menu")[0],
            elem.parentNode.offsetTop - 30,
            600
          );
        }
      }, 200);
    });
    function scrollTo(element, to, duration) {
      var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
      var animateScroll = function () {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
      animateScroll();
    }
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  });
  togglePinnedName();
})();
// product-page-js-start
var toggleDataElements = document.querySelectorAll(".toggle-data");
toggleDataElements.forEach(function (element) {
  element.addEventListener("click", function () {
    var productWrapperElements = document.querySelectorAll(".product-wrapper");
    productWrapperElements.forEach(function (wrapperElement) {
      wrapperElement.classList.toggle("sidebaron");
    });
  });
});
// product-page-js-end
// RESPONSIVE SIDEBAR 1200<
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var pageWrapper = document.querySelector(".page-wrapper");
  var toggleSidebarButton = document.querySelector(".toggle-sidebar");
  var widthWindow = window.innerWidth;
  if (widthWindow <= 1199) {
    pageWrapper.classList.add("sidebar-close");
    toggleSidebarButton.classList.add("close");
  }
  window.addEventListener("resize", function () {
    var widthWindow = window.innerWidth;
    if (widthWindow <= 1199) {
      pageWrapper.classList.add("sidebar-close");
      toggleSidebarButton.classList.add("close");
    } else {
      pageWrapper.classList.remove("sidebar-close");
      toggleSidebarButton.classList.remove("close");
    }
  });
});
// scrollTop sidebar in active link in JS
$(document).ready(function () {
  var activeLink = $(".simplebar-wrapper .simplebar-content-wrapper a.active");
  if (
    activeLink.length > 0 &&
    $("#pageWrapper").hasClass("compact-wrapper")
  ) {
    var scrollTop = activeLink.offset().top - 400;
    $(".simplebar-wrapper .simplebar-content-wrapper").animate(
      {
        scrollTop: scrollTop,
      },
      1000
    );
  }
});
