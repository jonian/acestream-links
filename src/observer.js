function observeContent(content) {
  let start = function(observer) {
    observer.observe(content, { childList: true, subtree: true });
  }

  let pause = function(observer) {
    observer.disconnect();
  }

  let watch = function(mutations, observer) {
    pause(observer);

    mutations.forEach(function(item) {
      item.addedNodes.forEach(generateLinks);
    });

    start(observer);
  }

  start(new MutationObserver(watch));
}

observeContent(document.body);
