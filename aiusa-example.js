function checkForAdblocker() {
  // Create an element that mimics an ad and inject it into the page
  document.body.insertAdjacentHTML(
    "beforeend",
    '<ins data-adBlockTest class="adsbygoogle ad-zone ad-space ad-unit textads banner-ads banner_ads" style="display: block !important; width:1px !important; height: 1px !important; visibility: hidden !important;"></ins>'
  );
  const testAd = document.querySelector("[data-adBlockTest]");

  // Check to see if the visitor is running an Ad Blocker
  if (testAd) {
    const testAdWidth = testAd.offsetWidth;
    if (testAdWidth == "1") {
      console.log("########################################");
      console.log(
        "No adblocker detected, will run a Giving Tuesday Multivariate Promotion"
      );
      triggerPromotions();
    } else if (testAdWidth == "0") {
      console.log("########################################");
      console.log(
        "Adblocker detected, won't run any of the Multivariate Promotions"
      );
      console.log(
        "Triggering Promotion #81261: Giving Tuesday - Test 0 of 3 - Multistep Lightbox for visitors with an Ad Blocker"
      );
      console.log("########################################");
      window.triggerPromotion(81261);
    }
  }
}

function triggerPromotions() {
  // Define the promotions to pick from
  const gtPromotions = ["multistep", "spinner", "optinmonster"];

  // Randomly pick and run one promotion
  if (gtPromotions) {
    const myPromotion =
      gtPromotions[Math.floor(Math.random() * gtPromotions.length)];
    if (myPromotion == "multistep") {
      console.log(
        "Triggering Promotion #81263: Giving Tuesday - Test 1 of 3 - Multistep Lightbox"
      );
      console.log("########################################");
      window.triggerPromotion(81263);
      window.dataLayer.push({
        event: "promotion_seen",
        promotionName:
          "Promotion #81263: Giving Tuesday - Test 1 of 3 - Multistep Lightbox",
      });
    } else if (myPromotion == "spinner") {
      console.log(
        "Triggering Promotion #81264: Giving Tuesday - Test 2 of 3 - Spinner"
      );
      window.triggerPromotion(81264);
    } else if (myPromotion == "optinmonster") {
      console.log(
        "Triggering Promotion #81265: Giving Tuesday - Test 3 of 3 - OptinMonster Full Screen Takeover"
      );
      window.triggerPromotion(81265);
    } else {
      console.log(
        "The promotion chosen is outside the array and nothing was triggered"
      );
      console.log("########################################");
    }
  }
}

checkForAdblocker();
