let xpath = "//*[not(self::a)][contains(text(), 'acestream://')]";
let links = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (let index = 0; index < links.snapshotLength; index++) {
  let node = links.snapshotItem(index);
  let href = node.textContent.match(/acestream\:\/\/[\w\d]+/);
  let link = document.createElement('a');

  link.href = href;
  link.text = node.textContent;

  node.firstChild.remove();
  node.appendChild(link);
}
