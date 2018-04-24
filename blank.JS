
function webGet(websiteURL) {
  var  xmlHttpAddress = new XMLHttpRequest();
  xmlHttpAddress.open( "GET", websiteURL, false );
  xmlHttpAddress.send( null );
  return xmlHttpAddress.responseText;
}
