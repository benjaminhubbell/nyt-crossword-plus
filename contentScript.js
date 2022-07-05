(() => {
  "use strict";
  const a = 2;
  let body = document.body;
  let toggleBodyLockSelector = "#toggle-body-lock";
  let toolbarToolsSelector = "ul.xwd__toolbar--tools"
  let pencilSelectors = [
    ".xwd__toolbar_icon--pencil",
    ".xwd__toolbar_icon--pencil-active"
  ];
  var methods = {
    "init": () => {
      
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.action === "toggle-pencil") {
            document.querySelectorAll(pencilSelectors.join(","))[0].click();
          }
          else if (request.action === "toggle-body-lock") {
            methods.toggleBodyLock();
          }
        }
      );

      methods.waitForElement(toolbarToolsSelector, 0).then(function(){
        var div = document.createElement("div");

        var li = document.createElement("li");
        li.className = "xwd__tool--button";

        var button = document.createElement("button");
        button.id = "toggle-body-lock";
        button.type = "button";
        button.ariaLabel = "Lock Body Scroll";
        button.innerHTML = "Lock";
        button.dataset.lockStatus = "unlocked";

        li.appendChild(button);
        div.appendChild(li).onclick;
        div.onclick = methods.toggleBodyLock;

        var parentElement = document.querySelector("ul.xwd__toolbar--tools");
        parentElement.insertBefore(div, parentElement.children[1]);
    });

    },
    "toggleBodyLock": () => {
      var button = document.querySelector(toggleBodyLockSelector);

      if (button.dataset.lockStatus == "unlocked"){
        body.style.overflow = "hidden";
        button.innerHTML = "Unlock";
        button.style.width = "63px";
        button.dataset.lockStatus = "locked";
        button.style.background = "#4f85e5";
        button.style.color = "#fff";
      }
      else {
        body.style.overflow = "";
        button.innerHTML = "Lock";
        button.dataset.lockStatus = "unlocked";
        button.style.width = "45px";
        
        button.style.background = "#fff";
        button.style.color = "#000";
      }
    },
    "waitForElement": (querySelector, timeout) => {
      return new Promise((resolve, reject)=>{
        var timer = false;
        if(document.querySelectorAll(querySelector).length) return resolve();
        const observer = new MutationObserver(()=>{
          if(document.querySelectorAll(querySelector).length){
            observer.disconnect();
            if(timer !== false) clearTimeout(timer);
            return resolve();
          }
        });
        observer.observe(document.body, {
          childList: true, 
          subtree: true
        });
        if(timeout) timer = setTimeout(()=>{
          observer.disconnect();
          reject();
        }, timeout);
      });
    }
  }

  methods.init();

})();
