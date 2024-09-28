/*!-----------------------------------------------------------------------------------
 Template Name: Edmin
 Template URI: themes.pixelstrap.com/Edmin
 Description: This is Admin Template
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap
 -----------------------------------------------------------------------------------
01. Loader js
02. Tap to top js
03. Header DropDown Toggle js
04. Header search js
05. Dark Mode js 
06. Bookmark js
07. Search menu dropdown js
08. Background Image js
09. Touchpin js
11. card-header cart close js
*/
(function () {
  const body = document.querySelector("body");
  const HTML = document.querySelector("html");
  /*=====================
        01 Loader Js
    ==========================*/
  $(".loader-wrapper").fadeOut("slow", function () {
    $(this).remove();
  });
  /*=====================
        02 Tap to top js
    ==========================*/
  const button = document.querySelector(".tap-top");
  const displayButton = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    });
  };
  const scrollToTop = () => {
    button.addEventListener("click", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      console.log(event);
    });
  };
  displayButton();
  scrollToTop();
  /*=====================
        03 Header DropDown Toggle
    ==========================*/
  body.addEventListener("click", function (event) {
    const headerDropdownMenu = document.querySelectorAll(".custom-menu");
    const dropdownEl = event.target.closest(".custom-dropdown");
    const visible = dropdownEl
      ?.querySelector(".custom-menu")
      .classList.contains("show");
    const dropdownMenuElement = event.target.closest(".custom-menu");
    if (!dropdownMenuElement) {
      headerDropdownMenu.forEach((item) => {
        item.classList.remove("show");
      });
    }
    if (!dropdownEl) return;
    const dropdownMenu = dropdownEl.querySelector(".custom-menu");
    if (!visible) dropdownMenu.classList.add("show");
  });
  /*=====================
     04. Header search js
   ==========================*/
  $(".search-mode").on("click", function (e) {
    $(".search-form").toggleClass("open");
    e.preventDefault();
  });
  /*=====================
     05. Dark Mode js
   ==========================*/ 
   if (window.location.pathname.includes("layout-dark.html")) {
    $("html").attr("data-theme", "dark");
  } else {
    $(".dark-mode").on("click", function () {
      const bodyModeDark = $("html").attr("data-theme") === "dark";
      if (!window.location.pathname.includes("layout-dark.html")) {
        if (!bodyModeDark) {
          $(".dark-mode").addClass("active");
          localStorage.setItem("mode", "dark");
          $("html").attr("data-theme", "dark");
        } else {
          $(".dark-mode").removeClass("active");
          localStorage.setItem("mode", "light");
          $("html").attr("data-theme", "light");
        }
      }
    });
    $("html").attr(
      "data-theme",
      localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
    );
    $(".dark-mode").addClass(
      localStorage.getItem("mode") === "dark" ? "active" : " "
    );
  }
  
   
  /*=====================
   06. Bookmark js
 ==========================*/
  let IconStar = document.querySelector(".icon-star");
  if (IconStar === "starred") {
    IconStar.classList.remove("starred");
  }
  /*=====================
    08. Background Image js
    ==========================*/
  $(".bg-center").parent().addClass("b-center");
  $(".bg-img-cover").parent().addClass("bg-size");
  $(".bg-img-cover").each(function () {
    var el = $(this),
      src = el.attr("src"),
      parent = el.parent();
    parent.css({
      "background-image": "url(" + src + ")",
      "background-size": "cover",
      "background-position": "center",
      display: "block",
    });
    el.hide();
  });
})();
/*=====================
    09. Touchpin js
    ==========================*/
let getInputByClass = document.getElementsByClassName("input-touchspin");
(function () {
  Array.from(getInputByClass).forEach((elem, i) => {
    let inputData = elem.getAttribute("value");
    let isIncrement = elem.parentNode.querySelectorAll(".increment-touchspin");
    let isDecrement = elem.parentNode.querySelectorAll(".decrement-touchspin");
    if (isIncrement) {
      isIncrement[0].addEventListener("click", () => {
        inputData++;
        elem.setAttribute("value", inputData);
      });
    }
    if (isDecrement) {
      isDecrement[0].addEventListener("click", () => {
        if (inputData > 0) {
          inputData--;
          elem.setAttribute("value", inputData);
        }
      });
    }
  });
})();
/*=====================
    11. card-header cart close js
    ==========================*/
document.querySelectorAll(".cartbox .btn-close").forEach(function (element) {
  element.addEventListener("click", function (e) {
    var tets = this.parentNode.parentNode.classList.add("d-none");
    console.log(tets);
  });
});
