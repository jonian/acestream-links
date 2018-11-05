function addTextNode(node, string) {
  if (!string.length) return;

  let text = document.createTextNode(string);
  node.appendChild(text);
}

function addLinkNode(node, href) {
  if (!href.length) return;

  let link = document.createElement('a');
  node.appendChild(link);

  link.href = href;
  link.text = href;
}

let linkRegex = new RegExp(/acestream\:\/\/[\w\d]+/);
let lineRegex = new RegExp(`\\n?.*${linkRegex.source}.*\\n?`, 'g');

let linkXpath = "//*[not(self::a)][contains(text(), 'acestream://')]";
let linkItems = document.evaluate(linkXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (let index = 0; index < linkItems.snapshotLength; index++) {
  let node = linkItems.snapshotItem(index);
  let data = node.textContent.match(lineRegex);

  if (data) {
    node.firstChild.remove();

    data.forEach(function (item) {
      let text = item.split(linkRegex);
      let href = item.match(linkRegex);

      addTextNode(node, text[0]);
      addLinkNode(node, href)
      addTextNode(node, text[1]);
    });
  }
}
