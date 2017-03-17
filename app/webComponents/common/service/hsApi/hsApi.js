(function() {
  angular.module("myApp").service("hsAPI", function() {
    this["userLogin"] = "/user/login";
    this["userLogout"] = "/user/logout";
    this["categoryTree"] = "/category/tree";
    this["test"] = "/erms/import";
  });

}).call(this);
