### Single Cookie Replenishment Tester

This is a single cookie tester meant to test individual cookies in a cookie string to isolate which cookie is responsible for storing cart data.

## How to use Single Cookie Tester

* Go to site, add an item to cart
* Open javascript console, enter `document.cookie`
* Copy the cookie string
* Start a new session and go to site
* Execute the following script, replacing the value for "cookie" with the value you copied
* The script goes through each cookie in the new sessions, and replaces it the cookie from the old sessions. The browser will automatically refresh.
* Until you see the cart quantity change on site, continue to execute the script by copying and pasting it into the console (or pressing the up arrow and enter)
* When the cart quantity changes, execute the script once more. You will see a message in magenta in the console with the name of the cart cookie.
* If the cart quantity does not change and you run out of cookies to test, then a message will log to the console telling you that you have run out of cookies. This usually means that we can write the cart cookie or the cart cookie depends on multiple cookies.

`var cookie = 'test=cookie; '
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

SingleCookieTester(cookie);`
