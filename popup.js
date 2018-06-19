var btnSubmit = document.getElementById('btnSubmit');
var sltDirection = document.getElementById('sltDirection');

function $(elementId) {
  return document.getElementById(elementId);
}


  chrome.storage.sync.get('direction', function(data) {
    //sltDirection.style.backgroundColor = data.direction;
    //sltDirection.setAttribute('value', data.color);
    //chrome.storage.sync.set({'direction'
  });
  
  sltDirection.onchange = function(element) {
    let direction = element.target.value;
    chrome.storage.sync.set({'direction': direction});
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'order-by.js'})
    });
  };

function initialize() {
  setLocalizedTopicList();
}
function setLocalizedTopicList() {
  var getI18nMsg = chrome.i18n.getMessage;
  $('optNull').innerText = getI18nMsg('SelectDirection');
  $('optAsc').innerText = getI18nMsg('LowtoHigh');
  $('optDesc').innerText = getI18nMsg('HightoLow');
  $('heading').innerText = getI18nMsg('SortByPrice');
}

initialize();