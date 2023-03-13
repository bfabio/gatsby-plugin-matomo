"use strict";

exports.__esModule = true;
exports.onRouteUpdate = void 0;
var first = true;
function getDuration() {
  var start = window.start || new Date();
  var now = new Date();
  var difference = now.getTime() - start.getTime();
  if (difference === 0) {
    return null;
  }
  return difference;
}
var onRouteUpdate = function onRouteUpdate(_ref, pluginOptions) {
  var location = _ref.location,
    prevLocation = _ref.prevLocation;
  if (process.env.NODE_ENV === 'production' || window.dev === true) {
    if (!window._paq) return;
    var _window = window,
      _paq = _window._paq,
      dev = _window.dev;
    var url = location && location.pathname + location.search + location.hash;
    var prevUrl = prevLocation && prevLocation.pathname + prevLocation.search + prevLocation.hash;
    var _pluginOptions$trackL = pluginOptions.trackLoad,
      trackLoad = _pluginOptions$trackL === void 0 ? true : _pluginOptions$trackL;

    // document.title workaround stolen from:
    // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/gatsby-browser.js
    var sendPageView = function sendPageView() {
      var _document = document,
        title = _document.title;
      prevUrl && _paq.push(['setReferrerUrl', prevUrl]);
      _paq.push(['setCustomUrl', url]);
      _paq.push(['setDocumentTitle', title]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      _paq.push(['trackAllContentImpressions']);
      if (dev) {
        console.debug("[Matomo] Page view for: " + url + " - " + title);
      }
    };

    // Minimum delay for reactHelmet's requestAnimationFrame
    var delay = Math.max(32, 0);
    setTimeout(sendPageView, delay);
    if (first) {
      first = false;
      if (trackLoad) {
        _paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()]);
      }
      if (dev) {
        console.debug("[Matomo] Tracking duration for: " + url);
      }
    }
  }
  return null;
};
exports.onRouteUpdate = onRouteUpdate;