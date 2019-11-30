const linkRegex = new RegExp(/acestream\:\/\/[\w\d]{40}/, 'i');
const lineRegex = new RegExp(`\\n?.*${linkRegex.source}.*\\n?`, 'gi');

function addTextNode(node, string) {
  if (!string.length) return;

  let text = document.createTextNode(string.toLowerCase());
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
  link.href = href.toLowerCase();

  addIconNode(link);
  addTextNode(link, href);

  link.classList.add('generated-acelink-link');
  node.appendChild(link);
}

function generateLinks(content) {
  let xpathMode = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  let linkXpath = "//*[not(self::a)][contains(translate(text(), 'ACESTRM', 'acestrm'), 'acestream://')]";
  let linkItems = document.evaluate(linkXpath, content, null, xpathMode, null);

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

if (document.body.textContent.match(linkRegex)) {
  generateLinks(document.body);
}
