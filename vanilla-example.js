// Helper function to log and push to dataLayer
function logAndPush(message, dataLayerEvent) {
  console.log(message);
  if (dataLayerEvent) {
    window.dataLayer.push(dataLayerEvent);
  }
}

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
      console.log("No adblocker detected, will run AB Tests");
      triggerTests();
    } else if (testAdWidth == "0") {
      console.log("Adblocker detected, won't run any of the AB Tests");
      console.log("Running Control #1");
      window.triggerTest(12345_0);
      logAndPush("Ad Blocker Detected", {
        event: "test_seen",
        testName: "Ad Blocker Detected",
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
      window.triggerTest(12345_1);
      logAndPush("Triggering Test #1 - Description TBD", {
        event: "test_seen",
        testName: "Test #1 - Description TBD",
      });
    } else if (myTests == "test2") {
      window.triggerTest(12345_2);
      logAndPush("Triggering Test #2 - Description TBD", {
        event: "test_seen",
        testName: "Test #2 - Description TBD",
      });
    } else if (myTests == "test3") {
      window.triggerTest(12345_3);
      logAndPush("Triggering Test #3 - Description TBD", {
        event: "test_seen",
        testName: "Test #3 - Description TBD",
      });
    } else {
      console.log(
        "The test chosen is outside the array and nothing was triggered"
      );
    }
  }
}

console.log("## AB Test Trigger Started #####################################");
checkForAdblocker();
console.log("## AB Test Trigger Ended #######################################");
