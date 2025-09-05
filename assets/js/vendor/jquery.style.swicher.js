// https://github.com/camsjams/jquery-style-switcher
/**
 * @author Cameron Manavian
 * jQuery Style Switcher
 * The MIT License (MIT)
 * Copyright (c) 2014 Cameron Manavian
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software.
 */

(function ($) {
  var jStyleSwitcher,
    _defaultOptions = {
      hasPreview: true,
      defaultThemeId: "jssDefault",
      fullPath: "css/",
      cookie: {
        expires: 7, // Set the default cookie expiry time
        isManagingLoad: true,
      },
    },
    _cookieKey = "jss_selected",
    _docCookies = {};

  _docCookies = {
    getItem: function (sKey) {
      if (!sKey) return null;
      return (
        decodeURIComponent(
          document.cookie.replace(
            new RegExp(
              "(?:(?:^|.;)\\s" +
                encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]).$)|^.*$"
            ),
            "$1"
          )
        ) || null
      );
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires =
              vEnd === Infinity
                ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
                : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie =
        encodeURIComponent(sKey) +
        "=" +
        encodeURIComponent(sValue) +
        sExpires +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "") +
        (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) return false;
      document.cookie =
        encodeURIComponent(sKey) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      if (!sKey) return false;
      return new RegExp(
        "(?:^|;\\s*)" +
          encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
          "\\s*\\="
      ).test(document.cookie);
    },
    keys: function () {
      var aKeys = document.cookie
        .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
        .split(/\s*(?:\=[^;])?;\s/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;
    },
  };

  jStyleSwitcher = function ($root, config) {
    return this.init($root, config);
  };

  jStyleSwitcher.prototype = {
    $root: null,
    config: {},
    $themeCss: null,
    defaultTheme: null,

    init: function ($root, config) {
      this.$root = $root;
      this.config = $.extend(true, _defaultOptions, config);
      this.setDefaultTheme();
      if (this.defaultTheme) {
        if (this.config.cookie.isManagingLoad) {
          this.checkCookie();
        }
        if (this.config.hasPreview) {
          this.addHoverEvents();
        }
        this.addClickEvents();
      } else {
        this.$root.addClass("jssError error level0");
      }
    },

    setDefaultTheme: function () {
      this.$themeCss = $("link[id=" + this.config.defaultThemeId + "]");
      if (this.$themeCss.length) {
        this.defaultTheme = this.$themeCss.attr("href");
      }
    },

    resetStyle: function () {
      this.updateStyle(this.defaultTheme);
    },

    updateStyle: function (newStyle) {
      this.$themeCss.attr("href", newStyle);
    },

    getFullAssetPath: function (asset) {
      return this.config.fullPath + asset + ".css";
    },

    checkCookie: function () {
      var styleCookie = _docCookies.getItem(_cookieKey);
      if (styleCookie) {
        var newStyle = this.getFullAssetPath(styleCookie);
        this.updateStyle(newStyle);
        this.defaultTheme = newStyle;
      }
    },

    addHoverEvents: function () {
      var self = this;
      this.$root.find("a").hover(
        function () {
          var asset = $(this).data("theme"),
            newStyle = self.getFullAssetPath(asset);
          self.updateStyle(newStyle);
        },
        function () {
          self.resetStyle();
        }
      );
    },

    addClickEvents: function () {
      var self = this;
      this.$root.find(".setColor").on("click", function () {
        var asset = $(this).data("theme"),
          newStyle = self.getFullAssetPath(asset);
        self.updateStyle(newStyle);
        self.defaultTheme = newStyle;
        if (self.config.cookie) {
          _docCookies.setItem(
            _cookieKey,
            asset,
            self.config.cookie.expires,
            "/"
          );
        }
      });
    },
  };

  $.fn.styleSwitcher = function (options) {
    return new jStyleSwitcher(this, options);
  };

  $(function () {
    var savedTheme = Cookies.get("styleCookieName");

    if (!savedTheme) {
      $("body").removeClass("active-dark-mode").addClass("active-light-mode");
      Cookies.set("styleCookieName", "light", { expires: 7 });
    } else if (savedTheme === "dark") {
      $("body").addClass("active-light-mode").removeClass("active-dark-mode");
    } else {
      $("body").addClass("active-light-mode").removeClass("active-dark-mode");
    }

    $(".setColor").on("click", function () {
      var theme = $(this).data("theme");

      if (theme === "dark") {
        $("body").addClass("active-light-mode").removeClass("active-dark-mode");
      } else {
        $("body").addClass("active-dark-mode").removeClass("active-light-mode");
      }

      Cookies.set("styleCookieName", theme, { expires: 7 });
    });

    function setStyleCookie() {
      var styleCookieVal = $("body").hasClass("active-light-mode")
        ? "dark"
        : "light";
      Cookies.set("styleCookieName", styleCookieVal, { expires: 7 });
    }

    if (Cookies.get("styleCookieName") == "dark") {
      $("body").addClass("active-light-mode");
    } else if (Cookies.get("styleCookieName") == "light") {
      $("body").removeClass("active-dark-mode");
    } else {
      $("body").removeClass("active-dark-mode");
    }

    $("#my_switcher .setColor").on("click", function () {
      $(this)
        .closest("ul")
        .find("li")
        .siblings()
        .find(".active")
        .removeClass("active");
      $(this).addClass("active");
      setStyleCookie();
    });

    $("#my_switcher .setColor.dark").on("click", function () {
      $("body").removeClass("active-dark-mode").addClass("active-light-mode");
      setStyleCookie();
    });
    $("#my_switcher .setColor.light").on("click", function () {
      $("body").removeClass("active-light-mode").addClass("active-dark-mode");
      setStyleCookie();
    });
  });
})(jQuery);
