// http://blogger.ziesemer.com/2008/05/javascript-namespace-function.html
var org_hudsonci_namespace = function(name, separator, container){
  var ns = name.split(separator || '.'),
    o = container || window,
    i,
    len;
  for(i = 0, len = ns.length; i < len; i++){
    o = o[ns[i]] = o[ns[i]] || {};
  }
  return o;
};
