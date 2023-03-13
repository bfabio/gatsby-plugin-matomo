"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.onRenderBody = void 0;
var _react = _interopRequireDefault(require("react"));
// eslint-disable-next-line no-unused-vars

function buildTrackingCode(pluginOptions) {
  var matomoUrl = pluginOptions.matomoUrl,
    _pluginOptions$matomo = pluginOptions.matomoPhpScript,
    matomoPhpScript = _pluginOptions$matomo === void 0 ? 'piwik.php' : _pluginOptions$matomo,
    _pluginOptions$matomo2 = pluginOptions.matomoJsScript,
    matomoJsScript = _pluginOptions$matomo2 === void 0 ? 'piwik.js' : _pluginOptions$matomo2,
    siteId = pluginOptions.siteId,
    dev = pluginOptions.dev,
    localScript = pluginOptions.localScript,
    requireConsent = pluginOptions.requireConsent,
    requireCookieConsent = pluginOptions.requireCookieConsent,
    disableCookies = pluginOptions.disableCookies,
    cookieDomain = pluginOptions.cookieDomain,
    enableJSErrorTracking = pluginOptions.enableJSErrorTracking,
    _pluginOptions$respec = pluginOptions.respectDnt,
    respectDnt = _pluginOptions$respec === void 0 ? true : _pluginOptions$respec,
    _pluginOptions$additi = pluginOptions.additionalTrackers,
    additionalTrackers = _pluginOptions$additi === void 0 ? [] : _pluginOptions$additi;
  var script = localScript ? localScript : matomoUrl + "/" + matomoJsScript;
  var dntCondition = respectDnt ? "!(navigator.doNotTrack === '1' || window.doNotTrack === '1')" : "true";
  var html = "\n    window.dev = " + dev + "\n    if (window.dev === true || " + dntCondition + ") {\n      window._paq = window._paq || [];\n      " + (requireConsent ? "window._paq.push(['requireConsent']);" : '') + "\n      " + (requireCookieConsent ? "window._paq.push(['requireCookieConsent']);" : '') + "\n      " + (disableCookies ? "window._paq.push(['disableCookies']);" : '') + "\n      " + (enableJSErrorTracking ? "window._paq.push(['enableJSErrorTracking']);" : '') + "\n      " + (cookieDomain ? "window._paq.push(['setCookieDomain', '" + cookieDomain + "']);" : '') + "\n      window._paq.push(['setTrackerUrl', '" + matomoUrl + "/" + matomoPhpScript + "']);\n      window._paq.push(['setSiteId', '" + siteId + "']);\n      window._paq.push(['enableHeartBeatTimer']);\n      " + additionalTrackers.map(function (t) {
    return "window._paq.push(['addTracker', '" + t.trackerUrl + "', '" + t.siteId + "']);";
  }).join('\n') + "\n\n      window.start = new Date();\n\n      (function() {\n        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];\n        g.type='text/javascript'; g.async=true; g.defer=true; g.src='" + script + "'; s.parentNode.insertBefore(g,s);\n      })();\n\n      if (window.dev === true) {\n        console.debug('[Matomo] Tracking initialized')\n        console.debug('[Matomo] matomoUrl: " + matomoUrl + ", siteId: " + siteId + "')\n      }\n    }\n  ";
  return /*#__PURE__*/_react.default.createElement("script", {
    key: "script-gatsby-plugin-matomo",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}
function buildTrackingCodeNoJs(pluginOptions, pathname) {
  var matomoUrl = pluginOptions.matomoUrl,
    _pluginOptions$matomo3 = pluginOptions.matomoPhpScript,
    matomoPhpScript = _pluginOptions$matomo3 === void 0 ? 'piwik.php' : _pluginOptions$matomo3,
    siteId = pluginOptions.siteId,
    siteUrl = pluginOptions.siteUrl;
  var html = "<img src=\"" + matomoUrl + "/" + matomoPhpScript + "?idsite=" + siteId + "&rec=1&url=" + (siteUrl + pathname) + "\" style=\"border:0\" alt=\"tracker\" />";
  return /*#__PURE__*/_react.default.createElement("noscript", {
    key: "noscript-gatsby-plugin-matomo",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
}
function buildHead(pluginOptions) {
  return /*#__PURE__*/_react.default.createElement("link", {
    rel: "preconnect",
    href: pluginOptions.matomoUrl,
    key: "preconnect-gatsby-plugin-matomo"
  });
}
var onRenderBody = function onRenderBody(_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
    setPostBodyComponents = _ref.setPostBodyComponents,
    pathname = _ref.pathname;
  var isProduction = process.env.NODE_ENV === 'production';
  var excludePaths = ['/offline-plugin-app-shell-fallback/'];
  if (pluginOptions && typeof pluginOptions.exclude !== 'undefined') {
    pluginOptions.exclude.map(function (exclude) {
      excludePaths.push(exclude);
    });
  }
  var isPathExcluded = excludePaths.some(function (path) {
    return pathname === path;
  });
  if ((isProduction || pluginOptions && pluginOptions.dev === true) && !isPathExcluded) {
    setHeadComponents([buildHead(pluginOptions)]);
    setPostBodyComponents([buildTrackingCode(pluginOptions), buildTrackingCodeNoJs(pluginOptions, pathname)]);
  }
};
exports.onRenderBody = onRenderBody;