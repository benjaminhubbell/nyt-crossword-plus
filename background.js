chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'toggle-pencil':
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"action": "toggle-pencil"}, function(response) {
          // Intentionally left blank
        });
      });
      
      break;
      
    default:
      console.log(`Command ${command} not found`);
  }
});
