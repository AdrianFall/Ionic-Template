
angular.module('app.services', ['ngCookies'])

  .factory('BlankFactory',
    ['$http', '$rootScope',
      function($http, $rootScope, $scope) {
        var service = {};

        return service;
      }

    ]
  )


  .factory('FacebookService',
    ['$q', '$http', '$rootScope',
      function($q, $http, $rootScope, $scope) {
        var service = {};

        /* Returns the accessToken */
        service.login = function() {
          console.log('logging in to facebook')
          var defer = $q.defer();

          FB.getLoginStatus(function(response) {

            if (response.status && response.status == 'connected') {

              if (response.authResponse.accessToken)
                defer.resolve(response.authResponse.accessToken);
              else
                defer.reject("Facebook didn't provide the access token");
            } else {
              FB.login(function(response) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                  console.log('Good to see you, ' + response.name + '.');

                });

                if (response.authResponse && response.authResponse.accessToken) {
                  $http({
                    method: 'POST',
                    url: url,
                    data: $.param({input_token: response.authResponse.accessToken}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).success(function () {
                    alert('success')
                  }).error(function () {
                    alert('error')
                  });
                  defer.resolve(response.authResponse.accessToken);
                } else
                  defer.reject("Facebook didn't provide the access token");

              }, {scope: 'email'})
            }

            /*if (response.accessToken && response.accessToken.length > 5) {
              accessToken = response.accessToken;
              defer.resolve();
            } else {
              FB.login(function(response) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                  console.log('Good to see you, ' + response.name + '.');
                  defer.resolve();
                });

              })
            }*/
          });



          return defer.promise;
        }

        return service;
      }

    ]
  )


  .factory('AccountActivationService',
    ['$http', '$rootScope', '__env',
      function($http, $rootScope, __env, $scope) {
        var service = {};

        service.ResendActivationMail = function(email, callback) {
          var credentials = {
            email : email
          }
          $http.post(__env.apiUrl + __env.baseUrl + 'resendConfirmationEmail', credentials)
            .success(function (response) {
              callback(response);
            }).error(function (error, status) {
            errorResponse = {
              error: '',
              status: 0
            };

            switch (status) {
              case 404:
              {
                errorResponse.error = 'Page Not Found';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 406:
              {
                if (error.error)
                  errorResponse.error = error.error;
                else if (error.emailError)
                  errorResponse.error = error.emailError;
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 0:
              {
                // server probably down
                errorResponse.error = 'No connection with server';
                errorResponse.status = 0;
              }
              default:
              {
                errorResponse.error = 'Error - status : ' + status + ' ';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
            }
          })
        }

        service.ActivateAccount = function(token, callback) {
          $http.get(__env.apiUrl + __env.baseUrl + 'registrationConfirm', {
            params: {token: token}

          }).success(function (response) {
            callback(response);
          }).error(function (error, status) {
            errorResponse = {
              error: '',
              status: 0
            };

            switch (status) {
              case 404:
              {
                errorResponse.error = 'Page Not Found';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 406:
              {
                if (error.error)
                  errorResponse.error = error.error;
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 0:
              {
                // server probably down
                errorResponse.error = 'No connection with server';
                errorResponse.status = 0;
              }
              default:
              {
                errorResponse.error = 'Error - status : ' + status + ' ';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
            }
          })

        }

        return service;
      }

    ]
  )

  .factory('ResetPasswordService',
    ['$http', '$rootScope', '__env',
      function($http, $rootScope, __env, $scope) {
        var service = {};

        service.RequestResetPassword = function(email, callback) {
          var credentials = {
            email : email
          }

          $http.post(__env.apiUrl + __env.baseUrl + 'requestResetPassword', credentials)
            .success(function (response) {
              callback(response);
            }).error(function (error, status) {
            errorResponse = {
              error: '',
              status: 0
            };

            switch (status) {
              case 404:
              {
                errorResponse.error = 'Page Not Found';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 406:
              {
                if (error.error)
                  errorResponse.error = error.error;
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 0:
              {
                // server probably down
                errorResponse.error = 'No connection with server';
                errorResponse.status = 0;
              }
              default:
              {
                errorResponse.error = 'Error - status : ' + status + ' ';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
            }
            })
        }

        service.ResetPassword = function(token, password, confirmPassword, callback) {
          var credentials = {
            token: token,
            password: password,
            confirmPassword: confirmPassword
          }

          $http.post(__env.apiUrl + __env.baseUrl + 'resetPassword', credentials)
            .success(function (response) {
              callback(response);
            }).error(function (error, status) {
            errorResponse = {
              error: '',
              status: 0
            };

            switch (status) {
              case 404:
              {
                errorResponse.error = 'Page Not Found';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 406:
              {
                if (error.error)
                  errorResponse.error = error.error;
                else if (error.passwordError)
                  errorResponse.error = error.passwordError;
                else if (error.confirmPasswordError)
                  errorResponse.error = error.confirmPasswordError;
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 0:
              {
                // server probably down
                errorResponse.error = 'No connection with server';
                errorResponse.status = 0;
              }
              default:
              {
                errorResponse.error = 'Error - status : ' + status + ' ';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
            }
          })

        }

        return service;
      }

    ]
  )


  .factory('RegistrationService',
    ['$http', '$rootScope', '__env',
      function($http, $rootScope, __env,  $scope) {
        var service = {};

        service.Register = function(email, password, confirmPassword, callback) {
          var credentials = {
            email : email,
            password: password,
            confirmPassword: confirmPassword
          }
          $http.post(__env.apiUrl + __env.baseUrl + 'register', credentials)
            .success(function (response) {
              callback(response);
            }).error(function(error,status) {
              errorResponse = {
                error: '',
                status: 0
              };

              switch (status) {
                case 404:
                {
                  errorResponse.error = 'Page Not Found';
                  errorResponse.status = status;
                  callback(errorResponse);
                  return;
                }
                case 406:
                {
                  if (error.emailError)
                    errorResponse.error = error.emailError;
                  else if (error.passwordError)
                    errorResponse.error = error.passwordError;
                  else if (error.confirmPasswordError)
                    errorResponse.error = error.confirmPasswordError;
                  errorResponse.status = status;
                  callback(errorResponse);
                  return;
                }
                case 0:
                {
                  // server probably down
                  errorResponse.error = 'No connection with server';
                  errorResponse.status = 0;
                }
                default:
                {
                  errorResponse.error = 'Error - status : ' + status + ' ';
                  errorResponse.status = status;
                  callback(errorResponse);
                  return;
                }
              }
            })
        }

        return service;
      }

    ]
  )

  .factory('AuthenticationService',
    ['$q', 'Base64', '$http', '$cookieStore', '$rootScope', '$timeout', '__env',
      function ($q, Base64, $http, $cookieStore, $rootScope, $timeout, __env,$scope) {
        var service = {};

        service.exchangeFacebookAccessTokenForAuth = function(accessToken) {
          var deferred = $q.defer();

          $http.post(__env.apiUrl + __env.baseUrl + 'social/facebook/login', {}, {headers: {input_token: accessToken}})
            .success(function (response) {
              alert('success')
              deferred.resolve();
            }).error(function (error, status) {
              alert('error')
            deferred.reject(error);
          })



          return deferred.promise;
        }

        service.Login = function (username, password, callback) {

          /* Use this for real authentication
           ----------------------------------------------*/
          $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(username + ':' + password);

          $http.get(__env.apiUrl + __env.baseUrl + 'api/user', {})
            .success(function (response) {
              callback(response);
            }).error(function(error, status, headers) {
            errorResponse = {
              error: '',
              status: 0
            };

            switch (status) {
              case 404:
              {
                errorResponse.error = 'Page Not Found';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
              case 401:
              {
                var errorHeader = headers("error");
                errorResponse.error = (errorHeader)  ? errorHeader : "Wrong credentials.";
                errorResponse.status = 401;
                callback(errorResponse);
                return;
              }
              case 0:
              {
                // server probably down
                errorResponse.error = 'No connection with server';
                errorResponse.status = 0;
              }
              default:
              {
                errorResponse.error = 'Error - status : ' + status + ' ';
                errorResponse.status = status;
                callback(errorResponse);
                return;
              }
            }


           /* window.alert('status ' + status);

              if (status == 404) {
                response.error = 'Page Not Found';
                response.status = status;
                callback(errorResponse);
              }


              callback(errorResponse);
            */
            });

        };

        service.SetCredentials = function (username, password) {
          var authdata = Base64.encode(username + ':' + password);

          $rootScope.globals = {
            currentUser: {
              username: username,
              authdata: authdata
            }
          };

          $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
          $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
          $rootScope.globals = {};
          $cookieStore.remove('globals');
          $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
      }])

  .factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      },

      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
          window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
      }
    };

    /* jshint ignore:end */
  })
.service('BlankService', [function(){

}]);

