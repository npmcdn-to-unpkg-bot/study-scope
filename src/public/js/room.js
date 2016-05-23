function onFileUpload() {
  var splittedPath = window.location.pathname.split('/');
  document.querySelector('#roomId').value = splittedPath[splittedPath.length - 1];
}