const linkRegex = new RegExp(/acestream\:\/\/[\w\d]+/);
const lineRegex = new RegExp(`\\n?.*${linkRegex.source}.*\\n?`, 'g');

function addTextNode(node, string) {
  if (!string.length) return;

  let text = document.createTextNode(string);
  node.appendChild(text);
}

function addIconNode(node) {
  let icon = document.createElement('img');
  icon.src = browser.extension.getURL('icon.svg');

  icon.classList.add('generated-acelink-icon');
  node.appendChild(icon);
}

function addLinkNode(node, href) {
  if (!href.length) return;

  let link  = document.createElement('a');
  link.href = href;

  addIconNode(link);
  addTextNode(link, href);

  node.appendChild(link);
}

function generateLinks(content) {
  let linkXpath = "//*[not(self::a)][contains(text(), 'acestream://')]";
  let linkItems = document.evaluate(linkXpath, content, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (let index = 0; index < linkItems.snapshotLength; index++) {
    let node = linkItems.snapshotItem(index);
    let data = node.textContent.match(lineRegex);

    if (data) {
      node.firstChild.remove();

      data.forEach(function (item) {
        let text = item.split(linkRegex);
        let href = item.match(linkRegex);

        addTextNode(node, text[0]);
        addLinkNode(node, href[0]);
        addTextNode(node, text[1]);
      });
    }
  }
}

generateLinks(document.body);
