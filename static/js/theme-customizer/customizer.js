(function ($) {
  if (localStorage.getItem("color"))
    $("#color").attr(
      "href",
      "../assets/css/" + localStorage.getItem("color") + ".css"
    );
  $(
    '<div class="sidebar-pannle-main"><ul><li class="cog-click icon-btn btn-primary" id="cog-click"><i class="fa fa-spin fa-cog"></i></li></ul></div><section class="setting-sidebar"><div class="customizer-header"><div class="theme-title"><div><h4>Preview Settings</h4><p class="mb-0">Try It Real Time<i class="fa-solid fa-thumbs-up fa-fw"></i></p></div><div class="flex-grow-1"><a class="icon-btn btn-outline-light button-effect pull-right cog-close" id="cog-close"><i class="fa-solid fa-xmark fa-fw"></i></a></div></div></div><div class="customizer-body"><div class="mb-3 p-2 rounded-3 default-border b-t-primary"><div class="color-header mb-2"><h4>Theme color mode:</h4><p class="font-light">Choose between 3 different mix layout.</p></div><div class="color-body d-flex align-items-center justify-space-between"><div class="color-img"><img class="img-fluid" src="../assets/images/customizer/light.png" alt=""><div class="customizer-overlay"></div><div class="button color-btn light-setting"><a href="javascript:void(0)">LIGHT</a></div></div><div class="color-img mx-1"><img class="img-fluid" src="../assets/images/customizer/dark.png" alt=""><div class="customizer-overlay"></div><div class="button color-btn dark-setting"><a href="javascript:void(0)">Dark</a></div></div><div class="color-img"><img class="img-fluid" src="../assets/images/customizer/mix.png" alt=""><div class="customizer-overlay"></div><div class="button color-btn mix-setting"><a href="javascript:void(0)">Mix</a></div></div></div></div><div class="mb-3 p-2 rounded-3 default-border b-t-primary"><div class="sidebar-icon mb-2"><h4>Sidebar icon:</h4><p class="font-light">Choose between 2 different sidebar icon.</p></div><div class="sidebar-body form-check radio ps-0"><ul class="radio-wrapper"><li class="default-svg"><input class="form-check-input" id="radio-icon5" type="radio" name="radio2" value="option2" checked=""><label class="form-check-label" for="radio-icon5"><svg class="stroke-icon svg-w-18 me-1"><use href="../assets/svg/iconly-sprite.svg#Activity"></use></svg><span>Stroke</span></label></li><li class="colorfull-svg"><input class="form-check-input" id="radio-icon6" type="radio" name="radio2" value="option2"><label class="form-check-label" for="radio-icon6"><svg class="stroke-icon svg-w-18 me-1"><use href="../assets/svg/iconly-sprite.svg#Activity"></use></svg><span>Colorfull icon</span></label></li></ul></div></div><div class="mb-3 p-2 rounded-3 default-border b-t-primary"><div class="theme-layout mb-2"><h4>Layout type:</h4><p class="font-light">Choose between 3 different layout types.</p></div><div class="radio-form checkbox-checked"><div class="form-check ltr-setting"><input class="form-check-input" id="flexRadioDefault1" type="radio" name="flexRadioDefault" checked=""><label class="form-check-label" for="flexRadioDefault1">LTR</label></div><div class="form-check rtl-setting"><input class="form-check-input" id="flexRadioDefault2" type="radio" name="flexRadioDefault"><label class="form-check-label" for="flexRadioDefault2">RTL</label></div><div class="form-check box-setting"><input class="form-check-input" id="flexRadioDefault3" type="radio" name="flexRadioDefault"><label class="form-check-label" for="flexRadioDefault3">Box</label></div></div></div><div class="mb-3 p-2 rounded-3 default-border b-t-primary"><div class="sidebar-type mb-2"><h4>Sidebar type:</h4><p class="font-light">Choose between 2 different sidebar types.</p></div><form><div class="sidebar-body form-check radio ps-0"><ul class="radio-wrapper"><li class="vertical-setting"><input class="form-check-input" id="radio-icon" type="radio" name="radio2" value="option2" checked=""><label class="form-check-label" for="radio-icon"><span>Vertical</span></label></li><li class="horizontal-setting"><input class="form-check-input" id="radio-icon4" type="radio" name="radio2" value="option2"><label class="form-check-label" for="radio-icon4"><span>Horizontal</span></label></li></ul></div></form></div><div class="customizer-color mb-3 p-2 rounded-3 default-border b-t-primary"><div class="color-picker mb-2"><h4>Unlimited color:</h4></div><ul class="layout-grid"><li class="color-layout" data-attr="color-1" data-primary="#43b9b2" data-secondary="#c280d2"><div></div></li><li class="color-layout" data-attr="color-2" data-primary="#0F2C59" data-secondary="#DAC0A3"><div></div></li><li class="color-layout" data-attr="color-3" data-primary="#7A3E65" data-secondary="#E9A178"><div></div></li><li class="color-layout" data-attr="color-4" data-primary="#025464" data-secondary="#E57C23"><div></div></li><li class="color-layout" data-attr="color-5" data-primary="#3E64FF" data-secondary="#5EDFFF"><div></div></li><li class="color-layout" data-attr="color-6" data-primary="#506D84" data-secondary="#D4B499"><div></div></li></ul></div></div><div class="customizer-footer"><div class="d-flex align-items-center justify-content-around"><a class="btn btn-primary" href="https://themeforest.net/user/pixelstrap/portfolio" target="_blank"><svg class="stroke-white feather me-1"><use href="../assets/svg/feather-icons/dist/feather-sprite.svg#shopping-cart"></use></svg>Buy Now</a><a class="btn btn-primary" href="https://docs.pixelstrap.net/admin/edmin/document/" target="_blank"><svg class="stroke-white svg-w-21 me-1"><use href="../assets/svg/iconly-sprite.svg#Document"></use></svg>Document</a></div></div></section>'
  ).appendTo($("body"));
  (function () {})();
  // COLOR_PICKER
  $(document).ready(function () {
    $(".customizer-color li").on("click", function () {
      $(".customizer-color li").removeClass("active");
      $(this).addClass("active");
      var color = $(this).attr("data-attr");
      var primary = $(this).attr("data-primary");
      var secondary = $(this).attr("data-secondary");
      localStorage.setItem("color", color);
      localStorage.setItem("primary", primary);
      localStorage.setItem("secondary", secondary);
      localStorage.removeItem("dark");
      $("#color").attr("href", "../assets/css/" + color + ".css");
      $(".dark-only").removeClass("dark-only");
      location.reload(true);
    });
  });

  if (localStorage.getItem("primary") != null) {
    document.documentElement.style.setProperty(
      "--theme-default",
      localStorage.getItem("primary")
    );
  }
  if (localStorage.getItem("secondary") != null) {
    document.documentElement.style.setProperty(
      "--theme-secondary",
      localStorage.getItem("secondary")
    );
  }
  // SETTING-SIDEBAR-TOGGLE
  $(document).ready(function () {
    document.getElementById("cog-click").addEventListener("click", function () {
      var settingSidebar = document.querySelector(".setting-sidebar");
      settingSidebar.classList.add("open");
    });

    document.getElementById("cog-close").addEventListener("click", function () {
      var settingSidebar = document.querySelector(".setting-sidebar");
      settingSidebar.classList.remove("open");
    });
    // LTR/RTL/BOX_LAYOUT
    document
      .querySelector(".ltr-setting")
      .addEventListener("click", function () {
        document.body.classList.remove("rtl", "ltr", "box-layout");
        document.body.classList.add("ltr");
        document.documentElement.setAttribute("dir", "ltr");
      });

    document
      .querySelector(".rtl-setting")
      .addEventListener("click", function () {
        document.body.classList.remove("ltr", "rtl", "box-layout");
        document.body.classList.add("rtl");
        document.documentElement.setAttribute("dir", "rtl");
      });

    document
      .querySelector(".box-setting")
      .addEventListener("click", function () {
        document.body.classList.remove("rtl", "ltr");
        document.body.classList.add("box-layout");
        document.documentElement.removeAttribute("dir");
      });
    // COLORFULL SVG
    document
      .querySelector(".colorfull-svg")
      .addEventListener("click", function () {
        const pageSidebar = document.querySelector(".page-sidebar");
        pageSidebar.classList.add("iconcolor-sidebar");
        pageSidebar.setAttribute("data-sidebar-layout", "iconcolor-sidebar");
      });
    // STROKE SVG
    document.querySelectorAll(".default-svg").forEach(function (element) {
      element.addEventListener("click", function () {
        var pageSidebarElements = document.querySelectorAll(".page-sidebar");

        for (var i = 0; i < pageSidebarElements.length; i++) {
          pageSidebarElements[i].setAttribute(
            "data-sidebar-layout",
            "stroke-svg"
          );
          pageSidebarElements[i].classList.remove("iconcolor-sidebar");
        }
      });
    });


// HORIZONTAL SIDEBAR
// Check if the variable is already set in localStorage
var sidebarSetting = localStorage.getItem("sidebarSetting");

// Check the initial value and apply the corresponding class
if (sidebarSetting === "vertical-sidebar") {
  $(".page-wrapper").addClass("compact-wrapper");
  $(".page-wrapper").removeClass("horizontal-sidebar");
} else if (sidebarSetting === "horizontal-sidebar") {
  $(".page-wrapper").addClass("horizontal-sidebar");
  $(".page-wrapper").removeClass("compact-wrapper");
}

// Event handler for the click event on elements with class "vertical-setting"
$(".vertical-setting").click(function () {
  // Update the variable and store it in localStorage
  sidebarSetting = "vertical-sidebar";
  localStorage.setItem("sidebarSetting", sidebarSetting);

  $(".page-wrapper").addClass("compact-wrapper");
  $(".page-wrapper").removeClass("horizontal-sidebar");
  location.reload();
});

// Event handler for the click event on elements with class "horizontal-setting"
$(".horizontal-setting").click(function () {
  // Update the variable and store it in localStorage
  sidebarSetting = "horizontal-sidebar";
  localStorage.setItem("sidebarSetting", sidebarSetting);

  $(".page-wrapper").addClass("horizontal-sidebar");
  $(".page-wrapper").removeClass("compact-wrapper");
});

    // Media query for screens below 1200px
    const mediaQuery = window.matchMedia("(max-width: 1200px)");

    // Function to handle the media query change
    function handleMediaQueryChange(event) {
      if (event.matches) {
        // Apply compact mode when the screen width is below 1200px
        $(".page-wrapper").addClass("compact-wrapper");
        $(".page-wrapper").removeClass("horizontal-sidebar");
      } else {

       // Remove compact mode when the screen width is above 1200px
    if (sidebarSetting === "horizontal-sidebar") {
      $(".page-wrapper").removeClass("compact-wrapper");
      $(".page-wrapper").addClass("horizontal-sidebar");
    }
      }
    }

    // Add a listener to the media query
    mediaQuery.addListener(handleMediaQueryChange);

    // Initial check of the media query when the page loads
    handleMediaQueryChange(mediaQuery);

    // LIGHT/DARK
    $(".light-setting").click(function () {
      $("html").attr("data-theme", "light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      document.body.classList.remove("dark-sidebar");
    });

    $(".dark-setting").click(function () {
      $("html").attr("data-theme", "dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      document.body.classList.remove("dark-sidebar");
    });
  });

  // // DARK SIDEBAR
  document.addEventListener("DOMContentLoaded", function () {
    const toggleDarkSidebarButton = document.querySelector(".mix-setting");
    const htmlTag = document.documentElement;

    toggleDarkSidebarButton.addEventListener("click", function () {
      htmlTag.setAttribute("data-theme", "dark-sidebar");
      document.body.classList.remove("dark", "light");
      document.body.classList.add("dark-sidebar");
    });
  });

  // HORIZONTAL SIDEBAR ARROW
  var view = $("#sidebar-menu");
  var move = "500px";
  var leftsideLimit = -500;

  var getMenuWrapperSize = function () {
    return $(".page-sidebar").innerWidth();
  };
  var menuWrapperSize = getMenuWrapperSize();

  if (menuWrapperSize >= "1660") {
    var sliderLimit = -4000;
  } else if (menuWrapperSize >= "1440") {
    var sliderLimit = -4600;
  } else {
    var sliderLimit = -4200;
  }

  $("#left-arrow").addClass("disabled");
  $("#right-arrow").click(function () {
    var currentPosition = parseInt(view.css("marginLeft"));
    if (currentPosition >= sliderLimit) {
      $("#left-arrow").removeClass("disabled");
      view.stop(false, true).animate(
        {
          marginLeft: "-=" + move,
        },
        {
          duration: 400,
          complete: function () {
            if (parseInt(view.css("marginLeft")) == -4500) {
              $("#right-arrow").addClass("disabled");
            }
          },
        }
      );
      if (currentPosition == sliderLimit) {
        $(this).addClass("disabled");
        console.log("sliderLimit", sliderLimit);
      }
    }
  });

  $("#left-arrow").click(function () {
    var currentPosition = parseInt(view.css("marginLeft"));
    if (currentPosition < 0) {
      view.stop(false, true).animate(
        {
          marginLeft: "+=" + move,
        },
        {
          duration: 400,
        }
      );
      $("#right-arrow").removeClass("disabled");
      $("#left-arrow").removeClass("disabled");
      if (currentPosition >= leftsideLimit) {
        $(this).addClass("disabled");
      }
    }
  });
})(jQuery);