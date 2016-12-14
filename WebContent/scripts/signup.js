(function () {



/**
 * Initialize
 */
function init() {
  // Register event listeners
  $('signup-btn').addEventListener('click', signup);

}  
//-----------------------------------
//    Sign Up
//------------------------------------
  function signup() {
    var username = $('username').value;
    var firstName = $('firstname').value;
    var lastName = $('lastname').value;
    var password = $('password').value;
    password = md5(username + md5(password));
    
    // The request parameters
    
    var url = './SignUpServlet';
    var params = 'user_id=' + username + '&password=' + password + '&first_name=' + firstName + '&last_name=' + lastName ;
    var req = JSON.stringify({});

    ajax('POST', url + '?' + params, req,
    // successful callback
    function (res) {
      var result = JSON.parse(res);
      
      // successfully logged in
      if (result.status === 'OK') {
    	  window.location.href="index.html";
      }
    },
    // error
      function () {
        showLoginError();
      }
    );
  }
// -----------------------------------
//  Helper Functions
// -----------------------------------



/**
 * A helper function that creates a DOM element <tag options...>
 * 
 * @param tag
 * @param options
 * @returns
 */
function $(tag, options) {
  if (!options) {
    return document.getElementById(tag);
  }

  var element = document.createElement(tag);

  for (var option in options) {
    if (options.hasOwnProperty(option)) {
      element[option] = options[option];
    }
  }

  return element;
}

function hideElement(element) {
  element.style.display = 'none';
}

function showElement(element, style) {
  var displayStyle = style ? style : 'block';
  element.style.display = displayStyle;
}

/**
 * AJAX helper
 * 
 * @param method - GET|POST|PUT|DELETE
 * @param url - API end point
 * @param callback - This the successful callback
 * @param errorHandler - This is the failed callback
 */
function ajax(method, url, data, callback, errorHandler) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  xhr.onload = function () {
	switch (xhr.status) {
	  case 200:
		callback(xhr.responseText);
		break;
	  case 403:
		onSessionInvalid();
		break;
	  case 401:
		errorHandler();
		break;
	}
  };

  xhr.onerror = function () {
    console.error("The request couldn't be completed.");
    errorHandler();
  };

  if (data === null) {
    xhr.send();
  } else {
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(data);
  }
}







init();

})();

// END