(function (window, document, $, undefined) {
  "use strict";

  var aiwaveJs = {
    i: function (e) {
      aiwaveJs.d();
      aiwaveJs.methods();
    },

    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },

    methods: function (e) {
      aiwaveJs.smothScroll();
      aiwaveJs.counterUpActivation();
      aiwaveJs.wowActivation();
      aiwaveJs.headerTopActivation();
      aiwaveJs.headerSticky();
      aiwaveJs.salActive();
      aiwaveJs.popupMobileMenu();
      aiwaveJs.popupDislikeSection();
      aiwaveJs.popupleftdashboard();
      aiwaveJs.popuprightdashboard();
      aiwaveJs.preloaderInit();
      aiwaveJs.showMoreBtn();
      aiwaveJs.slickSliderActivation();
      aiwaveJs.radialProgress();
      aiwaveJs.contactForm();
      aiwaveJs.menuCurrentLink();
      aiwaveJs.onePageNav();
      aiwaveJs.selectPicker();
    },

    selectPicker: function () {
      $("select").selectpicker();
    },

    menuCurrentLink: function () {
      var currentPage = location.pathname.split("/"),
        current = currentPage[currentPage.length - 1];
      $(".dashboard-mainmenu li a").each(function () {
        var $this = $(this);
        if ($this.attr("href") === current) {
          $this.addClass("active");
          $this.parents(".has-menu-child-item").addClass("menu-item-open");
        }
      });
      $(".mainmenu li a").each(function () {
        var $this = $(this);
        if ($this.attr("href") === current) {
          $this.addClass("active");
          $this.parents(".has-menu-child-item").addClass("menu-item-open");
        }
      });
      $(".user-nav li a").each(function () {
        var $this = $(this);
        if ($this.attr("href") === current) {
          $this.addClass("active");
          $this.parents(".has-menu-child-item").addClass("menu-item-open");
        }
      });
    },

    smothScroll: function () {
      $(document).on("click", ".smoth-animation", function (event) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top - 50,
          },
          300
        );
      });
    },

    popupMobileMenu: function (e) {
      $(".hamberger-button").on("click", function (e) {
        $(".popup-mobile-menu").addClass("active");
      });

      $(".close-menu").on("click", function (e) {
        $(".popup-mobile-menu").removeClass("active");
        $(
          ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
        )
          .siblings(".submenu, .rainbow-megamenu")
          .removeClass("active")
          .slideUp("400");
        $(
          ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
        ).removeClass("open");
      });

      $(
        ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
      ).on("click", function (e) {
        e.preventDefault();
        $(this)
          .siblings(".submenu, .rainbow-megamenu")
          .toggleClass("active")
          .slideToggle("400");
        $(this).toggleClass("open");
      });

      $(".popup-mobile-menu, .popup-mobile-menu .mainmenu.onepagenav li a").on(
        "click",
        function (e) {
          e.target === this &&
            $(".popup-mobile-menu").removeClass("active") &&
            $(
              ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
            )
              .siblings(".submenu, .rainbow-megamenu")
              .removeClass("active")
              .slideUp("400") &&
            $(
              ".popup-mobile-menu .mainmenu .has-dropdown > a, .popup-mobile-menu .mainmenu .with-megamenu > a"
            ).removeClass("open");
        }
      );
    },

    popupDislikeSection: function (e) {
      $(".dislike-section-btn").on("click", function (e) {
        $(".popup-dislike-section").addClass("active");
      });

      $(".close-button").on("click", function (e) {
        $(".popup-dislike-section").removeClass("active");
      });
    },

    popupleftdashboard: function (e) {
      function updateSidebar() {
        if ($(window).width() >= 1600) {
          $(".popup-dashboardleft-btn").removeClass("collapsed");
          $(".popup-dashboardleft-section").removeClass("collapsed");
        } else {
          $(".popup-dashboardleft-btn").addClass("collapsed");
          $(".popup-dashboardleft-section").addClass("collapsed");
        }
      }

      // Hide sidebars by default
      $(
        ".popup-dashboardleft-btn, .popup-dashboardleft-section, .rbt-main-content, .rbt-static-bar"
      ).hide();

      // Initial setup on page load
      updateSidebar();

      // Show sidebars after determining the appropriate state
      $(
        ".popup-dashboardleft-btn, .popup-dashboardleft-section, .rbt-main-content, .rbt-static-bar"
      ).show();

      // Update on window resize
      $(window).on("resize", function () {
        updateSidebar();
      });

      // Toggle classes on button click
      $(".popup-dashboardleft-btn").on("click", function (e) {
        $(".popup-dashboardleft-btn").toggleClass("collapsed");
        $(".popup-dashboardleft-section").toggleClass("collapsed");
      });
    },

    popuprightdashboard: function (e) {
      function updateSidebar() {
        if ($(window).width() >= 1600) {
          $(".popup-dashboardright-btn").removeClass("collapsed");
          $(".popup-dashboardright-section").removeClass("collapsed");
        } else {
          $(".popup-dashboardright-btn").addClass("collapsed");
          $(".popup-dashboardright-section").addClass("collapsed");
        }
      }
      // Hide sidebars by default
      $(
        ".popup-right-btn, .popup-right-section, .rbt-main-content, .rbt-static-bar"
      ).hide();

      // Initial setup on page load
      updateSidebar();

      // Show sidebars after determining the appropriate state
      $(
        ".popup-right-btn, .popup-right-section, .rbt-main-content, .rbt-static-bar"
      ).show();

      // Update on window resize
      $(window).on("resize", function () {
        updateSidebar();
      });

      // Toggle classes on button click
      $(".popup-dashboardright-btn").on("click", function (e) {
        $(".popup-dashboardright-btn").toggleClass("collapsed");
        $(".popup-dashboardright-section").toggleClass("collapsed");
      });
    },

    preloaderInit: function () {
      aiwaveJs._window.on("load", function () {
        $(".preloader").fadeOut("slow", function () {
          $(this).remove();
        });
      });
    },

    showMoreBtn: function () {
      $.fn.hasShowMore = function () {
        return this.each(function () {
          $(this).toggleClass("active");
          $(this).text("Show Less");
          $(this).parent(".has-show-more").toggleClass("active");

          if ($(this).parent(".has-show-more").hasClass("active")) {
            $(this).innerHTML("Show Less");
          } else {
            $(this).text("Show More");
          }
        });
      };
      $(document).on("click", ".rbt-show-more-btn", function () {
        $(this).hasShowMore();
      });
    },

    slickSliderActivation: function () {
      $(".testimonial-activation").not(".slick-initialized").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: "linear",
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
      });

      $(".sm-slider-carosel-activation").not(".slick-initialized").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        cssEase: "linear",
      });

      $(".slider-activation").not(".slick-initialized").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: "linear",
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
      });

      $(".blog-carousel-activation")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          adaptiveHeight: true,
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });

      $(".rainbow-service-slider-actvation")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: true,
          arrows: true,
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });

      $(".slider-brand-activation")
        .not(".slick-initialized")
        .slick({
          centerMode: true,
          draggable: false,
          centerPadding: "150px",
          dots: false,
          arrows: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 0,
          speed: 8000,
          pauseOnHover: true,
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "40px",
                slidesToShow: 1,
              },
            },
          ],
        });

      $(".brand-carousel-activation")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          adaptiveHeight: true,
          cssEase: "linear",
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });

      $(".banner-imgview-carousel-activation")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
          autoplay: true,
          arrows: false,
          adaptiveHeight: true,
          centerMode: true,
          centerPadding: "100px",
          cssEase: "linear",
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });

      $(".vedio-popup-carousel-activation")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          autoplay: false,
          arrows: false,
          adaptiveHeight: true,
          centerMode: true,
          centerPadding: "200px",
          cssEase: "linear",
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });

      $(".brand-carousel-init")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          adaptiveHeight: true,
          cssEase: "linear",
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });

      $(".about-app-activation").not(".slick-initialized").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        cssEase: "linear",
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
      });

      $(".template-galary-activation")
        .not(".slick-initialized")
        .slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          adaptiveHeight: true,
          cssEase: "linear",
          centerMode: false,
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa-sharp fa-regular fa-arrow-right"></i></button>',
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 581,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
    },

    salActive: function () {
      sal({
        threshold: 0.01,
        once: true,
      });
    },

    backToTopInit: function () {
      var scrollTop = $(".rainbow-back-top");
      $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 150) {
          $(scrollTop).css("opacity", "1");
        } else {
          $(scrollTop).css("opacity", "0");
        }
      });
      $(scrollTop).on("click", function () {
        $("html, body").animate(
          {
            scrollTop: 0,
            easingType: "linear",
          },
          10
        );
        return false;
      });
    },

    headerSticky: function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
          $(".header-sticky").addClass("sticky");
        } else {
          $(".header-sticky").removeClass("sticky");
        }
      });
    },

    counterUpActivation: function () {
      $(".counter").counterUp({
        delay: 10,
        time: 1000,
      });
    },

    wowActivation: function () {
      new WOW().init();
    },

    headerTopActivation: function () {
      $(".bgsection-activation").on("click", function () {
        $(".header-top-news").addClass("deactive");
      });
    },

    radialProgress: function () {
      $(".radial-progress").waypoint(
        function () {
          $(".radial-progress").easyPieChart({
            lineWidth: 10,
            scaleLength: 0,
            rotate: 0,
            trackColor: false,
            lineCap: "round",
            size: 220,
          });
        },
        {
          triggerOnce: true,
          offset: "bottom-in-view",
        }
      );
    },

    contactForm: function () {
      $(".rainbow-dynamic-form").on("submit", function (e) {
        e.preventDefault();
        var _self = $(this);
        var __selector = _self.closest("input,textarea");
        _self.closest("div").find("input,textarea").removeAttr("style");
        _self.find(".error-msg").remove();
        _self
          .closest("div")
          .find('button[type="submit"]')
          .attr("disabled", "disabled");
        var data = $(this).serialize();
        $.ajax({
          url: "mail.php",
          type: "post",
          dataType: "json",
          data: data,
          success: function (data) {
            _self
              .closest("div")
              .find('button[type="submit"]')
              .removeAttr("disabled");
            if (data.code == false) {
              _self.closest("div").find('[name="' + data.field + '"]');
              _self
                .find(".rainbow-btn")
                .after('<div class="error-msg"><p>*' + data.err + "</p></div>");
            } else {
              $(".error-msg").hide();
              $(".form-group").removeClass("focused");
              _self
                .find(".rainbow-btn")
                .after(
                  '<div class="success-msg"><p>' + data.success + "</p></div>"
                );
              _self.closest("div").find("input,textarea").val("");

              setTimeout(function () {
                $(".success-msg").fadeOut("slow");
              }, 5000);
            }
          },
        });
      });
    },

    onePageNav: function () {
      $(".onepagenav").onePageNav({
        currentClass: "current",
        changeHash: false,
        scrollSpeed: 500,
        scrollThreshold: 0.2,
        filter: "",
        easing: "swing",
      });
    },
  };
  aiwaveJs.i();
})(window, document, jQuery);

// Bg flashlight
let cards = document.querySelectorAll(".bg-flashlight");
cards.forEach((bgflashlight) => {
  bgflashlight.onmousemove = function (e) {
    let x = e.pageX - bgflashlight.offsetLeft;
    let y = e.pageY - bgflashlight.offsetTop;

    bgflashlight.style.setProperty("--x", x + "px");
    bgflashlight.style.setProperty("--y", y + "px");
  };
});

// Bg flashlight
let shapes = document.querySelectorAll(".blur-flashlight");
shapes.forEach((bgflashlight) => {
  bgflashlight.onmousemove = function (e) {
    let x = e.pageX - bgflashlight.offsetLeft;
    let y = e.pageY - bgflashlight.offsetTop;

    bgflashlight.style.setProperty("--x", x + 70 + "px");
    bgflashlight.style.setProperty("--y", y + 200 + "px");
  };
});

// Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Expand Textarea
// function expandTextarea(id) {
//     document.getElementById(id).addEventListener('keyup', function() {
//         this.style.overflow = 'hidden';
//         this.style.height = 0;
//         this.style.height = this.scrollHeight + 'px';
//     }, false);
// }

// expandTextarea('txtarea');

//Check All JS Activation
$(function () {
  var propFn = typeof $.fn.prop === "function" ? "prop" : "attr";

  $("#checkall").click(function () {
    $(this)
      .parents("fieldset:eq(0)")
      .find(":checkbox")
      [propFn]("checked", this.checked);
  });
  $("input[type=checkbox]:not(#checkall)").click(function () {
    if (!this.checked) {
      $("#checkall")[propFn]("checked", this.checked);
    } else {
      $("#checkall")[propFn](
        "checked",
        !$("input[type=checkbox]:not(#checkall)").filter(":not(:checked)")
          .length
      );
    }
  });
});

// Chat Box Reply
function generateAutoReply() {
  // Add your logic here to generate a dynamically generated auto-reply
  // For simplicity, let's just echo a placeholder message
  return `AiWave: I'm a dynamic chat bot!`;
}

function sendMessage() {
  const txtarea = document.getElementById("txtarea");
  const chatContainer = document.getElementById("chatContainer");
  let welcomeMessageIndex = 0;

  const welcomeMessages = [
    "Hello! How can I help you today?",
    "Welcome to our chat! Feel free to ask any questions.",
  ];

  const userMessage = txtarea.value.trim();
  if (userMessage === "") return;

  const userMessageElement = createEditableMessage(
    "You",
    userMessage,
    "author-speech",
    "assets/images/team/team-01sm.jpg"
  );
  appendMessage(userMessageElement);

  if (welcomeMessageIndex < welcomeMessages.length) {
    const welcomeMessageElement = createMessageWithReactions(
      "AiWave",
      welcomeMessages[welcomeMessageIndex],
      "ai-speech",
      "assets/images/team/avater.png"
    );
    appendMessage(welcomeMessageElement);
    welcomeMessageIndex++;
  } else {
    const autoReply = generateAutoReply();
    const autoReplyElement = createMessageWithReactions(
      "AiWave",
      autoReply,
      "ai-speech",
      "assets/images/team/avater.png"
    );
    appendMessage(autoReplyElement);
  }

  txtarea.value = "";
}

function createEditableMessage(title, message, speechClass, imgSrc) {
  const messageElement = createMessageElement(
    title,
    message,
    speechClass,
    imgSrc,
    true
  );
  return messageElement;
}

function createMessageWithReactions(title, message, speechClass, imgSrc) {
  const messageElement = createMessageElement(
    title,
    message,
    speechClass,
    imgSrc,
    false
  );
  return messageElement;
}

function createMessageElement(title, message, speechClass, imgSrc, isEditable) {
  const messageElement = document.createElement("div");
  messageElement.className = `chat-box ${speechClass}`;
  messageElement.innerHTML = `
      <div class="inner">
        <div class="chat-section">
          <div class="author">
            <img class="w-100" src="${imgSrc}" alt="${title}">
          </div>
          <div class="chat-content">
            <h6 class="title">${title}</h6>
            <p class="${isEditable ? "editable" : ""}" ${
    isEditable ? 'contenteditable="true"' : ""
  }>${message}</p>
            ${isEditable ? getEditButtons() : getReactionButtons()}
          </div>
        </div>
      </div>
    `;
  return messageElement;
}

function getEditButtons() {
  return `
      <div class="edit-actions">
        <button class="edit-btn btn-default btn-small btn-border" onclick="editMessage(this)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="save-regenerate-btn btn-default btn-small" onclick="saveAndRegenerateMessage(this)">Save & Regenerate</button>
        <button class="cancel-btn btn-default btn-small btn-border" onclick="cancelEdit(this)">Cancel</button>
      </div>
    `;
}

function getReactionButtons() {
  return `
      <div class="reaction-section">
      <div class="btn-grp">
      <div class="left-side-btn dropup">
          <button data-bs-toggle="modal" data-bs-target="#likeModal" class="react-btn btn-default btn-small btn-border"><i class="fa-sharp fa-regular fa-thumbs-up"></i></button>
          <button data-bs-toggle="modal" data-bs-target="#dislikeModal" class="react-btn btn-default btn-small btn-border"><i class="fa-sharp fa-regular fa-thumbs-down"></i></button>
          <button data-bs-toggle="modal" data-bs-target="#shareModal" class="react-btn btn-default btn-small btn-border"><i class="fa-sharp fa-solid fa-share"></i></button>
          <button type="button" class="react-btn btn-default btn-small btn-border dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-regular fa-ellipsis-vertical"></i>
          </button>
          <ul class="dropdown-menu style-one">
              <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-copy"></i> Copy</a></li>
              <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-tag"></i> Pin Chat</a></li>
              <li><a class="dropdown-item" href="#"><i class="fa-solid fa-file-lines"></i> Rename</a></li>
              <li><a class="dropdown-item delete-item" href="#"><i class="fa-solid fa-trash-can"></i> Delete Chat</a></li>
          </ul>
      </div>
      <div class="right-side-btn">
          <button class="react-btn btn-default btn-small btn-border" onclick="regenerateMessage()">
              <i class="fa-sharp fa-solid fa-repeat"></i><span>Regenerate</span>
          </button>
      </div>
  </div>
      </div>
    `;
}

function appendMessage(messageElement) {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function editMessage(button) {
  const chatContent = button.parentElement.parentElement.parentElement;
  const editable = chatContent.querySelector(".editable");
  editable.contentEditable = "true";
  editable.focus();
}

function saveAndRegenerateMessage(button) {
  const chatContent = button.parentElement.parentElement.parentElement;
  const editable = chatContent.querySelector(".editable");
  const editedMessage = editable.textContent;
  editable.contentEditable = "false";

  // Save the edited message (you can send it to a server, etc.)
  console.log("Saved message:", editedMessage);

  // Regenerate a new message
  const regeneratedMessage = generateAutoReply();
  const regeneratedMessageElement = createMessageWithReactions(
    "AiWave",
    regeneratedMessage,
    "ai-speech",
    "assets/images/team/avater.png"
  );
  appendMessage(regeneratedMessageElement);
}

function cancelEdit(button) {
  const chatContent = button.parentElement.parentElement.parentElement;
  const editable = chatContent.querySelector(".editable");
  editable.contentEditable = "false";
  // Optionally, you can revert the content to the original state
}

function regenerateMessage() {
  const regeneratedMessage = generateAutoReply();
  const regeneratedMessageElement = createMessageWithReactions(
    "AiWave",
    regeneratedMessage,
    "ai-speech",
    "assets/images/team/avater.png"
  );
  appendMessage(regeneratedMessageElement);
}

const txtarea = document.getElementById("txtarea");
if (null !== txtarea) {
  txtarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// New Javascript code by shivam

// Navbar
document.addEventListener("DOMContentLoaded", function () {
  // Select both toggle buttons and common elements
  const mobileToggleTablet = document.querySelector(".aktion-mobile-toggle");
  const mobileToggleMobile = document.querySelector(".aktion-mobile-toggle-1");
  const sidebarClose = document.querySelector(".aktion-sidebar-close");
  const sidebar = document.querySelector(".aktion-sidebar");
  const overlay = document.querySelector(".aktion-overlay");

  // Single function to handle sidebar toggle
  function toggleSidebar() {
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");
    document.body.style.overflow = sidebar.classList.contains("show")
      ? "hidden"
      : "";
  }

  // Add event listeners to both toggle buttons if they exist
  if (mobileToggleTablet) {
    mobileToggleTablet.addEventListener("click", toggleSidebar);
  }

  if (mobileToggleMobile) {
    mobileToggleMobile.addEventListener("click", toggleSidebar);
  }

  // Add event listeners to close button and overlay
  if (sidebarClose) {
    sidebarClose.addEventListener("click", toggleSidebar);
  }

  if (overlay) {
    overlay.addEventListener("click", toggleSidebar);
  }

  // Optional: Close sidebar on ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sidebar.classList.contains("show")) {
      toggleSidebar();
    }
  });
});

// Why choose us
document.addEventListener("DOMContentLoaded", function () {
  const aktionTabTriggers = document.querySelectorAll(".aktion-tab-trigger");
  const aktionTabPanels = document.querySelectorAll(".aktion-tab-panel");

  function handleAktionTabClick(event) {
    // Remove active classes
    aktionTabTriggers.forEach((trigger) =>
      trigger.classList.remove("aktion-tab-active")
    );
    aktionTabPanels.forEach((panel) =>
      panel.classList.remove("aktion-panel-active")
    );

    // Add active classes to clicked tab and corresponding panel
    const trigger = event.currentTarget;
    trigger.classList.add("aktion-tab-active");
    const tabId = trigger.getAttribute("data-aktion-tab");
    document
      .getElementById(`aktionTab${tabId}`)
      .classList.add("aktion-panel-active");
  }

  aktionTabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", handleAktionTabClick);
  });
});

// features section
// Data structure for features
const aktionFeatures = [
  {
    id: 1,
    icon: {
      gradient: "aktion-icon-1",
      svg: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12.913 17H20.087M12.913 17L11 21M12.913 17L15.7783 11.009C16.0092 10.5263 16.1246 10.2849 16.2826 10.2086C16.4199 10.1423 16.5801 10.1423 16.7174 10.2086C16.8754 10.2849 16.9908 10.5263 17.2217 11.009L20.087 17M20.087 17L22 21M2 5H8M8 5H11.5M8 5V3M11.5 5H14M11.5 5C11.0039 7.95729 9.85259 10.6362 8.16555 12.8844M10 14C9.38747 13.7248 8.76265 13.3421 8.16555 12.8844M8.16555 12.8844C6.81302 11.8478 5.60276 10.4266 5 9M8.16555 12.8844C6.56086 15.0229 4.47143 16.7718 2 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>

`,
    },
    title: "Multilingual Input - Both Offline & Online",
    description:
      "No more language barriers. Just seamless collaboration. AktionAI understands over 50+ languages, ensuring global teams stay aligned—no matter where they are",
    points: [
      "AI-Generated Tasks in Any Language – Extract and organize tasks while maintaining accuracy and context",
      "Language-Aware AI Models – Process complex grammar and nuances effortlessly",
      "Localized Task Outputs – Deliver action items in your sector specific terms",
      "Built-In Translation Support – Automatically convert tasks for smooth cross-language collaboration",
    ],
    link: {
      text: "Work Across Borders Effortlessly",
      url: "#",
    },
    image: "assets/images/features/Multi-Lingua-.webp",
  },
  {
    id: 2,
    icon: {
      gradient: "aktion-icon-2",
      svg: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`,
    },
    title: "Effortless Integration with Task Management Tools",
    description:
      "Connect your favorite tools. AktionAI seamlessly integrates with Optimore, Jira, Asana, Trello, Monday.com and more—so you never have to switch platforms",
    points: [
      "One-Click Connectivity – Sync tasks with your existing workflows instantly",
      "Enterprise API Support – Get custom API access for proprietary systems",
      "Real-Time Task Sync – Keep projects updated across multiple platforms",
      "Automated Task Assignments – AI-driven delegation within your tools",
    ],
    link: {
      text: "Integrate in Seconds",
      url: "#",
    },
    image: "assets/images/features/task.webp",
  },
  {
    id: 3,
    icon: {
      gradient: "aktion-icon-3",
      svg: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M5 8L10 13M4 14L10 8L12 5M2 5H14M7 2H8M12.913 17H20.087M12.913 17L11 21M12.913 17L15.7783 11.009C16.0092 10.5263 16.1246 10.2849 16.2826 10.2086C16.4199 10.1423 16.5801 10.1423 16.7174 10.2086C16.8754 10.2849 16.9908 10.5263 17.2217 11.009L20.087 17M20.087 17L22 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`,
    },
    title: "Multi-Language AI Model Management",
    description:
      "Optimized AI for every business need. AktionAI adapts to your industry, workflows, and preferred AI models for top-tier task generation",
    points: [
      "Multiple AI Language Models – Choose the best model for your needs",
      "Performance Monitoring – Track accuracy, efficiency, and cost per model",
      "Admin Customization – Prioritize AI settings based on your organization's structure",
    ],
    link: {
      text: "Optimize Your AI Workflow",
      url: "#",
    },
    image: "assets/images/features/language.webp",
  },
  {
    id: 4,
    icon: {
      gradient: "aktion-icon-4",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4H8C6.89543 4 6 4.89543 6 6V26C6 27.1046 6.89543 28 8 28H24C25.1046 28 26 27.1046 26 26V14M16 4L26 14M16 4V14H26" stroke="white" stroke-width="2"/>
                  </svg>`,
    },
    title: "Transparent Audit Trail & Accountability",
    description:
      "Every action tracked. Every task accounted for. Maintain clarity and compliance with a detailed, real-time audit log for all generated tasks",
    points: [
      "Full Task Logs – Monitor every task creation, modification, and update",
      "User Action Tracking – Keep accountability intact with detailed edit history",
      "Source Data Linking – Trace every action item back to its original transcript",
    ],
    link: {
      text: "Ensure Compliance & Transparency",
      url: "#",
    },
    image: "assets/images/features/audit.webp",
  },
  {
    id: 5,
    icon: {
      gradient: "aktion-icon-5",
      svg: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`,
    },
    title: "Customizable User & Company Preferences",
    description:
      "Your workflow, your rules. AktionAI adapts to your company's structure, permissions, and task generation settings—because one size doesn't fit all",
    points: [
      "Flexible Workflows – Adjust task creation & integration to match your process",
      "Role-Based Access – Manage permissions for teams, admins, and users",
    ],
    link: {
      text: "Customize Your AI Settings",
      url: "#",
    },
    image: "assets/images/features/customizable.webp",
  },
  {
    id: 6,
    icon: {
      gradient: "aktion-icon-6",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M4 28H28M4 4V28M4 22L10 16L16 22L28 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>`,
    },
    title: "AI-Powered Usage Analytics & Reporting",
    description:
      "Insights that drive efficiency. Monitor, measure, and optimize your AI-powered task automation with real-time data",
    points: [
      "Live Dashboard – View task creation rates, AI performance, and usage insights",
      "Custom Reports – Generate tailored analytics for business strategy",
    ],
    link: {
      text: "Unlock Data-Driven Productivity",
      url: "#",
    },
    image: "assets/images/features/analytics.webp",
  },
  {
    id: 7,
    icon: {
      gradient: "aktion-icon-7",
      svg: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H10.5M19.25 17V15.25C19.25 14.2835 18.4665 13.5 17.5 13.5C16.5335 13.5 15.75 14.2835 15.75 15.25V17M15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.0399 21 17.7599 20.891 17.546C20.7951 17.3578 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H15.6C15.0399 17 14.7599 17 14.546 17.109C14.3578 17.2049 14.2049 17.3578 14.109 17.546C14 17.7599 14 18.0399 14 18.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`,
    },
    title: "Enterprise-Grade Security & Compliance",
    description:
      "Your data. Fully protected. With GDPR, HIPAA, and enterprise-grade encryption, AktionAI keeps your sensitive information safe",
    points: [
      "Industry Compliance – Built to meet global security standards",
      "End-to-End Encryption – Secure task storage and controlled access",
      "SSO & MFA Support – Strengthen protection with single sign-on and multi-factor authentication",
    ],
    link: {
      text: "Secure Your Workflows",
      url: "#",
    },
    image: "assets/images/features/security.webp",
  },
  {
    id: 8,
    icon: {
      gradient: "aktion-icon-4",
      svg: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M21 18L19.9999 19.094C19.4695 19.6741 18.7502 20 18.0002 20C17.2501 20 16.5308 19.6741 16.0004 19.094C15.4693 18.5151 14.75 18.1901 14.0002 18.1901C13.2504 18.1901 12.5312 18.5151 12 19.094M3.00003 20H4.67457C5.16376 20 5.40835 20 5.63852 19.9447C5.84259 19.8957 6.03768 19.8149 6.21663 19.7053C6.41846 19.5816 6.59141 19.4086 6.93732 19.0627L19.5001 6.49998C20.3285 5.67156 20.3285 4.32841 19.5001 3.49998C18.6716 2.67156 17.3285 2.67156 16.5001 3.49998L3.93729 16.0627C3.59139 16.4086 3.41843 16.5816 3.29475 16.7834C3.18509 16.9624 3.10428 17.1574 3.05529 17.3615C3.00003 17.5917 3.00003 17.8363 3.00003 18.3255V20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`,
    },
    title: "Smart Task Management Features",
    description: "Total control over every AI-generated task",
    points: [
      "Editable Tasks – Modify descriptions, names, and assignments anytime",
      "AI Task Regeneration – Adjust tasks dynamically based on feedback",
      "Task Dependencies – Link related tasks for better workflow planning",
    ],
    link: {
      text: "Take Control of AI Tasks",
      url: "contact.html",
    },
    image: "assets/images/features/task-management.webp",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // Function to create feature HTML
  function createFeatureHTML(feature, isFirst = false) {
    return `
            <div class="aktion-feature-item ${isFirst ? "active" : ""}">
                <div class="aktion-feature-header">
                    <div class="aktion-feature-icon ${feature.icon.gradient}">
                        ${feature.icon.svg}
                    </div>
                    <div class="aktion-feature-intro">
                        <h3 class="aktion-feature-title3">${feature.title}</h3>
                        </div>
                    
                    <div class="aktion-feature-toggle">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                
                        <p class="aktion-feature-description mt-4">${
                          feature.description
                        }
                        </p>
                
                <div class="aktion-feature-content">
                    <div class="aktion-feature-points">
                        ${feature.points
                          .map(
                            (point) => `
                            <div class="aktion-feature-point">
                                <div class="aktion-point-icon">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <p class="aktion-point-text">${point}</p>
                            </div>
                        `
                          )
                          .join("")}
                        
                    </div>
                    <img src="${
                      feature.image
                    }" alt="${feature.title}" class="aktion-feature-image">
                </div>
            </div>
        `;
  }

  // Get the features container
  const featuresContainer = document.querySelector(".aktion-features-list");
  if (featuresContainer) {
    // Generate HTML for all features
    featuresContainer.innerHTML = aktionFeatures
      .map((feature, index) => createFeatureHTML(feature, index === 0))
      .join("");

    // Add minimal CSS for arrow rotation only
    const style = document.createElement("style");
    style.textContent = `
      .aktion-feature-toggle svg {
        transition: transform 0.3s ease;
      }
      
      .aktion-feature-item.active .aktion-feature-toggle svg {
        transform: rotate(360deg);
      }
    `;
    document.head.appendChild(style);

    // Add click handlers
    const featureItems = document.querySelectorAll(".aktion-feature-item");
    featureItems.forEach((item) => {
      const header = item.querySelector(".aktion-feature-header");

      header.addEventListener("click", function (e) {
        // Determine if this item is already active
        const isActive = item.classList.contains("active");

        // If this item is active, just toggle it off
        if (isActive) {
          item.classList.remove("active");
        } else {
          // Otherwise, close all others and open this one
          featureItems.forEach((otherItem) => {
            otherItem.classList.remove("active");
          });

          // Add active class to this item
          item.classList.add("active");
        }
      });

      // Prevent clicks inside content from triggering collapse
      const content = item.querySelector(".aktion-feature-content");
      if (content) {
        content.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }
    });
  }
});

// primary section
document.addEventListener("DOMContentLoaded", function () {
  // const questionMarksContainer = document.getElementById("questionMarks");
  // const numQuestionMarks = 20; // Number of question marks to create
  // for (let i = 0; i < numQuestionMarks; i++) {
  //   const questionMark = document.createElement("div");
  //   questionMark.className = "question-mark";
  //   questionMark.textContent = "?";
  //   // Random position
  //   const left = Math.random() * 100;
  //   const top = Math.random() * 100;
  //   // Random rotation
  //   const rotation = Math.random() * 360;
  //   questionMark.style.cssText = `
  //                   left: ${left}%;
  //                   top: ${top}%;
  //                   --rotation: ${rotation}deg;
  //               `;
  //   questionMarksContainer.appendChild(questionMark);
  //}
});

// Integrations page
document.addEventListener("DOMContentLoaded", function () {
  const tgFilterBtns = document.querySelectorAll(".tg-filter-btn");
  const tgCards = document.querySelectorAll(".tg-tool-card");

  tgFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      tgFilterBtns.forEach((b) => b.classList.remove("tg-active"));
      // Add active class to clicked button
      this.classList.add("tg-active");

      const filterValue = this.getAttribute("data-filter");

      tgCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.classList.remove("tg-hidden");
        } else {
          card.classList.add("tg-hidden");
        }
      });
    });
  });
});

// Learn page

// Add animation when elements come into view
document.addEventListener("DOMContentLoaded", function () {
  const featureRows = document.querySelectorAll(".feature-row");

  // Simple function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
  }

  // Function to handle scroll events
  function handleScroll() {
    featureRows.forEach((row) => {
      if (isInViewport(row) && !row.classList.contains("visible")) {
        row.classList.add("visible");
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize styles
  featureRows.forEach((row) => {
    row.style.opacity = "0";
    row.style.transform = "translateY(20px)";
    row.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  });

  // Check on load and scroll
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // Responsive layout fixes
  function adjustForMobile() {
    const isMobile = window.innerWidth < 992;
    const featureContents = document.querySelectorAll(".feature-content");
    const featureImageWrappers = document.querySelectorAll(
      ".feature-image-wrapper"
    );

    if (isMobile) {
      // On mobile, always show content first, then image
      featureContents.forEach((content) => {
        content.style.order = "1";
      });

      featureImageWrappers.forEach((wrapper) => {
        wrapper.style.order = "2";
      });
    } else {
      // On desktop, restore the original order for alternating layout
      featureContents.forEach((content, index) => {
        const isEven = index % 2 === 1;
        // For even sections, content should be on the right
        content.style.order = isEven ? "2" : "1";
      });

      featureImageWrappers.forEach((wrapper, index) => {
        const isEven = index % 2 === 1;
        // For even sections, image should be on the left
        wrapper.style.order = isEven ? "1" : "2";
      });
    }
  }

  // Run on load and resize
  adjustForMobile();
  window.addEventListener("resize", adjustForMobile);
});

document.addEventListener("DOMContentLoaded", function () {
  const aktionAI_animatedElements = document.querySelectorAll(
    ".aktionAI-fade-in-up"
  );

  function aktionAI_checkElementVisibility(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }

  function aktionAI_handleElementsInView() {
    aktionAI_animatedElements.forEach((element) => {
      if (
        aktionAI_checkElementVisibility(element) &&
        !element.classList.contains("aktionAI-visible")
      ) {
        element.classList.add("aktionAI-visible");
      }
    });
  }

  // Check initial state
  aktionAI_handleElementsInView();

  // Listen for scroll events
  window.addEventListener("scroll", aktionAI_handleElementsInView);

  // Card hover effect
  const aktionAI_integrationCards = document.querySelectorAll(
    ".aktionAI-category-card"
  );
  aktionAI_integrationCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      aktionAI_integrationCards.forEach((c) => {
        if (c !== card) {
          c.style.opacity = "0.7";
          c.style.transform = "scale(0.98)";
        }
      });
    });

    card.addEventListener("mouseleave", function () {
      aktionAI_integrationCards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "scale(1)";
      });
    });
  });

  // Button subtle pulse animation
  const aktionAI_exploreButton = document.querySelector(
    ".aktionAI-action-button"
  );
  let aktionAI_pulseTimerID;

  // function aktionAI_createButtonPulse() {
  //   aktionAI_exploreButton.style.transform = "scale(1.03)";
  //   setTimeout(() => {
  //     aktionAI_exploreButton.style.transform = "scale(1)";
  //   }, 300);

  //   aktionAI_pulseTimerID = setTimeout(aktionAI_createButtonPulse, 5000);
  // }

  // // Start pulsating after 3 seconds
  // setTimeout(aktionAI_createButtonPulse, 3000);

  // Clear the animation when hovered
  // aktionAI_exploreButton.addEventListener("mouseenter", function () {
  //   clearTimeout(aktionAI_pulseTimerID);
  //   aktionAI_exploreButton.style.transform = "";
  // });

  // Check and adjust for different screen sizes
  function aktionAI_adjustResponsiveLayout() {
    const windowWidth = window.innerWidth;
    const cards = document.querySelectorAll(".aktionAI-category-card");

    if (windowWidth < 768) {
      // For mobile devices
      cards.forEach((card) => {
        card.style.maxWidth = "100%";
      });
    } else if (windowWidth < 992) {
      // For tablets
      cards.forEach((card) => {
        card.style.maxWidth = "100%";
      });
    } else {
      // For desktops
      cards.forEach((card) => {
        card.style.maxWidth = "100%";
      });
    }
  }

  // Run on page load and when resizing
  aktionAI_adjustResponsiveLayout();
  window.addEventListener("resize", aktionAI_adjustResponsiveLayout);
});

// // Create and add meta tags to force light mode
// const metaColorScheme = document.createElement("meta");
// metaColorScheme.setAttribute("name", "color-scheme");
// metaColorScheme.setAttribute("content", "light");
// document.head.appendChild(metaColorScheme);

// // Create and inject CSS to override dark mode
// const styleElement = document.createElement("style");
// styleElement.textContent = `
//   @media (prefers-color-scheme: dark) {
//     html, body {
//       background-color: white !important;
//       color: black !important;
//       color-scheme: light !important;
//     }
//   }
// `;
// document.head.appendChild(styleElement);

// // Set attributes and classes to enforce light mode
// document.documentElement.style.colorScheme = "light";
// document.body.classList.remove("dark-mode", "dark-theme");
// document.body.classList.add("light-mode", "light-theme");

// Video switcher tabs
// document.addEventListener("DOMContentLoaded", function () {
//   let tabs = document.querySelectorAll(".tab-button .nav-link");
//   let currentIndex = 0;

//   function switchTab() {
//     // Remove active class from current tab
//     tabs[currentIndex].classList.remove("active");
//     let currentPane = document.querySelector(
//       tabs[currentIndex].dataset.bsTarget
//     );
//     currentPane.classList.remove("show", "active");

//     // Move to the next tab
//     currentIndex = (currentIndex + 1) % tabs.length;

//     // Add active class to the new tab
//     tabs[currentIndex].classList.add("active");
//     let newPane = document.querySelector(tabs[currentIndex].dataset.bsTarget);
//     newPane.classList.add("show", "active");
//   }

//   // Set interval to switch tabs every 10 seconds
//   setInterval(switchTab, 10000);
// });

// var video = document.querySelector(".tab-video");
// video.playbackRate = 0.2; // Set the playback speed to 0.5x

// function initializeCustomVideoControls() {
//   const uniqueVideo = document.getElementById("uniqueVideoPlayer");
//   const uniqueSoundToggle = document.getElementById("uniqueSoundToggle");
//   const uniqueSoundIcon = document.getElementById("uniqueSoundIcon");

//   uniqueSoundToggle.addEventListener("click", function () {
//     if (uniqueVideo.muted) {
//       uniqueVideo.muted = false;
//       uniqueSoundIcon.textContent = "🔊";
//     } else {
//       uniqueVideo.muted = true;
//       uniqueSoundIcon.textContent = "🔇";
//     }
//   });
// }

// Call the initialization function when the DOM is ready
document.addEventListener("DOMContentLoaded", initializeCustomVideoControls);

// Enhanced hover effects and animations
document.addEventListener("DOMContentLoaded", function () {
  const planColumns = document.querySelectorAll(".prc_plan_column");

  // Only apply hover effects on non-touch devices
  if (window.matchMedia("(hover: hover)").matches) {
    planColumns.forEach((column) => {
      column.addEventListener("mouseenter", function () {
        const columnIndex = Array.from(this.parentNode.children).indexOf(this);

        // Highlight the entire column
        document.querySelectorAll(".prc_comparison_table tr").forEach((row) => {
          if (row.children[columnIndex]) {
            row.children[columnIndex].classList.add("prc_column_highlight");
          }
        });
      });

      column.addEventListener("mouseleave", function () {
        const columnIndex = Array.from(this.parentNode.children).indexOf(this);

        // Remove highlighting
        document.querySelectorAll(".prc_comparison_table tr").forEach((row) => {
          if (row.children[columnIndex]) {
            row.children[columnIndex].classList.remove("prc_column_highlight");
          }
        });
      });
    });
  }

  // Add staggered animation to table rows for a more dynamic appearance
  const tableRows = document.querySelectorAll(".prc_table_body tr");
  tableRows.forEach((row, index) => {
    row.style.opacity = "0";
    row.style.transform = "translateY(20px)";
    row.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
    row.style.transitionDelay = `${0.1 + index * 0.05}s`;

    setTimeout(() => {
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, 100);
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   // Unique function name to avoid conflicts
//   function bxlFeatureTabsInit() {
//     const tabButtons = document.querySelectorAll(".bxl-tab-button");

//     tabButtons.forEach((button) => {
//       button.addEventListener("click", function () {
//         // Remove active class from all tabs
//         tabButtons.forEach((btn) => {
//           btn.classList.remove("bxl-tab-active");
//         });

//         // Add active class to current tab
//         this.classList.add("bxl-tab-active");

//         // Hide all panels
//         const contentPanels = document.querySelectorAll(".bxl-content-panel");
//         contentPanels.forEach((panel) => {
//           panel.classList.remove("bxl-panel-active");
//         });

//         // Show the selected panel
//         const tabIndex = this.getAttribute("data-bxl-tab");
//         const activePanel = document.getElementById("bxlTab" + tabIndex);
//         activePanel.classList.add("bxl-panel-active");
//       });
//     });
//   }

//   // Initialize tabs
//   bxlFeatureTabsInit();
// });
