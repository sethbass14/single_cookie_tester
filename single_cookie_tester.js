var cookie = 'test=cookie; '
function SingleCookieTester(cookie) {
  var cookieArray = cookie.split('; ').filter(Boolean);
  var cookieObjs = makeObjs(cookieArray)
  var cid = parseInt(localStorage.getItem('cid'))
  var testCookie = findCookieToTest(cid, cookieObjs)
  if (bouncex.vars.cart_qty) {
    var cartCookie = cookieObjs.filter(function(cookie) { return cookie.id === cid })[0]
    localStorage.removeItem('cid');
    console.log(`%cHEY BOUNCEX DEV, YOUR CART COOKIE NAME IS: ${cartCookie.name}`, "color:magenta" );
  } else if (testCookie){
    localStorage.setItem('cid', testCookie.id)
    replaceCookie(testCookie)
  } else {
    localStorage.removeItem('cid');
    console.log("%cYou are out of cookies and the key was not found", "color:magenta")
  }

}

function makeObjs(cookieArray) {
  return cookieArray.map(function(cookie, index) { return makeCookieObj(cookie, index) });
}

function makeCookieObj(cookie, index) {
  var splitCookie = cookie.split(/(=)/)
  var name = splitCookie[0]
  var value = splitCookie.slice(2).join('') || 'Cookie value is not set'
  var cookieObj = {
    id: index + 1,
    name: name,
    value: value,
  }
  return cookieObj
}

function findCookieToTest(cid, cookieObjs) {
  cid = cid ? cid : 0
  return cookieObjs.filter(function(cookie) { return cookie.id === cid + 1 })[0]
}

function replaceCookie(cookieObj) {
  var name = cookieObj.name
  var val = cookieObj.value
  var id = cookieObj.id
  var domain = location.host
  /* delete any existing cookie */
  var domains = [
    domain, /* with subdomain */
    domain.replace('www', ''), /* no subdomain i.e. .forever21.com */
    '', /* none specified, use default */
  ];
  for (var k = 0; k < domains.length; k++) {
    bouncex.utils.cookies.create({
      name: name,
      value: '0',
      days: -1,
      domain: domains[k]
    });
  }
  /* write cookie value saved from previous session */
  bouncex.utils.cookies.create({
    name: name,
    value: val,
    domain: domains[k]
  });
  console.log("NAME: ", name, " VALUE: ", val, 'ID: ', id)
  window.location.href = window.location.href
}

SingleCookieTester(cookie);
