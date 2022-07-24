(() => {
  "use strict";
  
  let body = document.body;
  let boardTitleSelector = "#boardTitle";
  let toggleBodyLockSelector = "#toggle-body-lock";
  let toolbarToolsSelector = "ul.xwd__toolbar--tools";
  let settingsPanelSelector = "#settings-panel";
  let pencilSelectors = [
    ".xwd__toolbar_icon--pencil",
    ".xwd__toolbar_icon--pencil-active"
  ];
  let boardTitle = "Puzzle Board";
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

      // Create lock button
      methods.waitForElement(toolbarToolsSelector, 0).then(function() {
        
        methods.createLockButton();
        methods.adjustSettingsPanel();
        //console.log(document.getElementsByClassName("xwd__tool--button")[0]);
        
      });

      // Disable board title
      methods.waitForElement("#xwd-board", 0).then(function() {
        document.querySelector(boardTitleSelector).innerHTML = "";
      });

    },
    "toggleBodyLock": () => {
      var button = document.querySelector(toggleBodyLockSelector);

      if (button.dataset.lockStatus == "unlocked"){
        body.style.overflow = "hidden";
        button.innerText = "Unlock";
        button.style.width = "63px";
        button.dataset.lockStatus = "locked";
        button.style.background = "#4f85e5";
        button.style.color = "#fff";
      }
      else {
        body.style.overflow = "";
        button.innerText = "Lock";
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
    },
    "createLockButton": () => {
      var parentElement = document.querySelector("ul.xwd__toolbar--tools");
      var div = document.createElement("div");
      var li = document.createElement("li");
      var button = document.createElement("button");
      
      button.id = "toggle-body-lock";
      button.type = "button";
      button.ariaLabel = "Lock Body Scroll";
      button.innerHTML = "Lock";
      button.dataset.lockStatus = "unlocked";
      
      li.className = "xwd__tool--button";
      li.appendChild(button);
      
      div.appendChild(li).onclick;
      div.onclick = methods.toggleBodyLock;

      parentElement.insertBefore(div, parentElement.children[1]);
    },
    "adjustSettingsPanel": () => {
      document.getElementsByClassName("xwd__tool--button")[0].addEventListener("click", function() {
        methods.waitForElement(settingsPanelSelector, 0).then(function() {
          var settingsColumns =  document.getElementsByClassName("xwd__settings-modal--column");
          var settingsColumn0 = settingsColumns[0];
          var settingsColumn1 = settingsColumns[1];
          var settingsColumn1Length = settingsColumn1.children.length

          for (var i = 0; i < settingsColumn1Length; i++) {
            settingsColumn0.appendChild(settingsColumn1.children[0]);
          }

          settingsColumn0.className = "xwd__settings-modal";
          settingsColumn1.remove();

          // var section = document.createElement("section");
          // var header = document.createElement("header");
          // var insetDiv = document.createElement("div");
          // var boardTitleSettingLabel = document.createElement("label");
          // var boardTitleSettingInput = document.createElement("input");
          // var boardTitleSettingSpan = document.createElement("span");

          // section.className = "xwd__settings-modal--section";
          // header.className = "xwd__settings-modal--heading";
          // header.innerText = "NYT Crossword Plus Settings";
          // insetDiv.className = "xwd__settings-modal--inset"
          // boardTitleSettingInput.type = "checkbox";
          // boardTitleSettingInput.setAttribute("name", "checkbox");
          // boardTitleSettingInput.setAttribute("tabindex", "0");
          // boardTitleSettingInput.setAttribute("readonly", true);
          // boardTitleSettingInput.setAttribute("value", true);
          // boardTitleSettingInput.setAttribute("checked", true);
          // boardTitleSettingSpan.innerText = "Hide board tooltip"
          // boardTitleSettingLabel.appendChild(boardTitleSettingInput);
          // boardTitleSettingLabel.appendChild(boardTitleSettingSpan);
          // insetDiv.appendChild(boardTitleSettingLabel);
          // section.appendChild(header);
          // section.appendChild(insetDiv);
          // settingsColumn0.appendChild(section);

          // boardTitleSettingInput.addEventListener("change", (event) => {
          //   if (event.currentTarget.checked) {
          //     document.querySelector(boardTitleSelector).innerHTML = "";
          //   }
          //   else {
          //     document.querySelector(boardTitleSelector).innerHTML = boardTitle;
          //   }
          // });
        });
      });
    }
  }

  methods.init();

})();
