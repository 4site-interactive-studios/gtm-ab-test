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
      console.log("No adblocker detected, will run AB Tests");
      triggerTests();
    } else if (testAdWidth == "0") {
      console.log("########################################");
      console.log("Adblocker detected, won't run any of the AB Tests");
      console.log("Running Control #1");
      console.log("########################################");
      window.triggerPromotion(12345 - 0);
      window.dataLayer.push({
        event: "test_seen",
        promotionName: "Ad Blocker Detected",
      });
    }
  }
}

function triggerTests() {
  // Define the tests to pick from
  const tests = ["test1", "test2", "test3"];

  // Randomly pick and run one promotion
  if (tests) {
    const myTests = tests[Math.floor(Math.random() * tests.length)];
    if (myTests == "test1") {
      console.log("Triggering Test #1 - Description TBD");
      window.triggerPromotion(12345_1);
      window.dataLayer.push({
        event: "test_seen",
        promotionName: "Test #1 - Description TBD",
      });
    } else if (myTests == "test2") {
      console.log("Triggering Test #2 - Description TBD");
      window.triggerPromotion(12345_2);
      window.dataLayer.push({
        event: "test_seen",
        promotionName: "Test #2 - Description TBD",
      });
    } else if (myTests == "test3") {
      console.log("Triggering Test #3 - Description TBD");
      window.triggerPromotion(12345_3);
      window.dataLayer.push({
        event: "test_seen",
        promotionName: "Test #3 - Description TBD",
      });
    } else {
      console.log(
        "The test chosen is outside the array and nothing was triggered"
      );
      console.log("########################################");
    }
  }
}

checkForAdblocker();
