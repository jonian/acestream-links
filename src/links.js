var aceRegex = /(?!<a.+)acestream\:\/\/[\w\d]+(?!.+a>)/g;
var aceLinks = function (match) {
  return '<a href="' + match + '">' + match + '</a>';
};

document.body.innerHTML = document.body.innerHTML.replace(aceRegex, aceLinks);
