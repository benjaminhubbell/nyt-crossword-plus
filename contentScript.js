chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "toggle-pencil") {
      document.querySelectorAll(".xwd__toolbar_icon--pencil, .xwd__toolbar_icon--pencil-active")[0].click();
    }
  }
);
