function isDebugMode() {
  // Check if ?debug=true is in URL (this won't change after page load)
  var search = window.location.search.substring(1);
  var params = search.split("&");
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split("=");
    if (param[0] === "debug" && param[1] === "true") {
      return true;
    }
  }

  // Check if GTM preview mode is active (Tag Assistant badge iframe present)
  // This check happens dynamically each time to catch iframe added after page load
  // Using querySelector which will find the element even if added dynamically
  var gtmPreview = document.querySelector("iframe.__TAG_ASSISTANT_BADGE");
  if (gtmPreview) {
    return true;
  }

  return false;
}

function debugLog() {
  if (isDebugMode()) {
    // Convert arguments to array for older browsers
    var args = Array.prototype.slice.call(arguments);
    console.log.apply(console, args);
  }
}

function checkForAdblocker() {
  // Create an element that mimics an ad and inject it into the page
  document.body.insertAdjacentHTML(
    "beforeend",
    '<ins data-adBlockTest class="adsbygoogle ad-zone ad-space ad-unit textads banner-ads banner_ads" style="display: block !important; width:1px !important; height: 1px !important; visibility: hidden !important;"></ins>'
  );
  var testAd = document.querySelector("[data-adBlockTest]");

  // Check to see if the visitor is running an Ad Blocker
  if (!testAd) {
    // If test element doesn't exist, default to running promotions
    debugLog("########################################");
    debugLog("Ad test element not found, will run A/B test");
    debugLog("########################################");
    triggerPromotions();
    return;
  }

  var testAdWidth = testAd.offsetWidth;

  // If width is 0, ad blocker is detected (element was hidden/blocked)
  if (testAdWidth === 0) {
    debugLog("########################################");
    debugLog("Adblocker detected, running Ad Blocker version");
    debugLog("Triggering Ad Blocker version: Single Step Lightbox");
    debugLog("########################################");
    triggerSingleStepLightbox(
      "https://support.savingplaces.org/page/91046/donate/1"
    );
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "promotion_seen",
        promotionName: "Ad Blocker: Single Step Lightbox",
        variant: "adblocker",
      });
    }
  } else {
    // No ad blocker detected (width is 1 or greater), randomly pick from promotions
    debugLog("########################################");
    debugLog(
      "No adblocker detected, will run A/B test (Control: Single Step vs Test: Multistep)"
    );
    debugLog("########################################");
    triggerPromotions();
  }
}

function triggerPromotions() {
  // Define the variants: control (Single Step) and test (Multistep)
  var variants = ["control", "test"];

  // Randomly pick and run one variant
  var selectedVariant = variants[Math.floor(Math.random() * variants.length)];

  if (selectedVariant == "control") {
    triggerSingleStepLightbox(
      "https://support.savingplaces.org/page/91043/donate/1"
    );
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "promotion_seen",
        promotionName: "Control: Single Step Lightbox",
        variant: "control",
      });
    }
  } else if (selectedVariant == "test") {
    triggerMultistepLightbox(
      "https://support.savingplaces.org/page/91045/donate/1"
    );
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "promotion_seen",
        promotionName: "Test: Multistep Lightbox",
        variant: "test",
      });
    }
  }
}

function triggerSingleStepLightbox(engridUrl) {
  debugLog("########################################");
  debugLog("triggerSingleStepLightbox() - FUNCTION CALLED");
  debugLog("URL provided:", engridUrl);
  debugLog("########################################");

  // Return early if no URL is provided
  if (!engridUrl) {
    debugLog("ERROR: No URL provided, exiting function");
    return;
  }

  // Optional start and stop dates in DD-MM-YYYY format
  var START_DATE = "01-01-2025"; // Set to '' if not needed
  var STOP_DATE = "01-01-2026"; // Set to '' if not needed

  function parseDate(str) {
    if (!str) return null;
    var parts = str.split("-");
    return new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );
  }

  function isWithinDateRange(now, start, stop) {
    if (start && stop) return now >= start && now <= stop;
    if (start && !stop) return now >= start;
    if (!start && stop) return now <= stop;
    return true;
  }

  var now = new Date();
  var start = parseDate(START_DATE);
  var stop = parseDate(STOP_DATE);

  var withinDateRange = isWithinDateRange(now, start, stop);

  debugLog("Date range check:", "within range =", withinDateRange);
  debugLog("Current date:", now);
  debugLog("Start date:", start);
  debugLog("Stop date:", stop);

  if (withinDateRange) {
    debugLog("########################################");
    debugLog("All conditions met - Loading Single Step Lightbox script");
    debugLog("Script URL:", engridUrl);
    debugLog("########################################");
    // Create script element and set all attributes BEFORE appending
    // The script will read these data attributes when it loads
    var script = document.createElement("script");
    script.defer = true;
    script.src =
      "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10104/engrid-iframe-lightbox.js";
    script.setAttribute("data-engrid-url", engridUrl);
    script.setAttribute("data-engrid-overlay-bgcolor", "#667eea");
    script.setAttribute("data-engrid-content-bgcolor", "#ffffff");
    script.setAttribute("data-engrid-trigger", "0");
    script.setAttribute("data-engrid-max-width", "600px");
    document.head.appendChild(script);
    debugLog("Script element appended to document.head");
  } else {
    debugLog("########################################");
    debugLog("CONDITIONS NOT MET - Script NOT loaded");
    debugLog("Current date is outside the allowed date range");
    debugLog("########################################");
  }
}

function triggerMultistepLightbox(donationUrl) {
  debugLog("########################################");
  debugLog("triggerMultistepLightbox() - FUNCTION CALLED");
  debugLog("URL provided:", donationUrl);
  debugLog("########################################");

  // Return early if no URL is provided
  if (!donationUrl) {
    debugLog("ERROR: No URL provided, exiting function");
    return;
  }

  // Set the DonationLightboxOptions BEFORE loading the script
  // The script will check for this when it loads
  window.DonationLightboxOptions = {
    name: "Super Ultra Mega Donation Lightbox",
    url: donationUrl,
    title: "Lorem ipsum dolor sit amet",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate eros diam.",
    image:
      "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/EN+Seasons+Greetings.png",
    logo: "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/multistep-logo.svg",
    footer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate eros diam.",
    mobile_enabled: true,
  };

  debugLog("DonationLightboxOptions set:", window.DonationLightboxOptions);

  // Load the multistep lightbox parent script
  debugLog("Loading multistep lightbox script...");
  var parentScript = document.createElement("script");
  parentScript.defer = true;
  parentScript.src =
    "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10028/donation-lightbox-parent.js";
  document.head.appendChild(parentScript);
  debugLog("Multistep script element appended to document.head");
  debugLog("########################################");
}

checkForAdblocker();
