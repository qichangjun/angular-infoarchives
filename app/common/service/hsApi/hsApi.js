(function() {
  angular.module("myApp").service("hsAPI", function() {
    this["userLogin"] = "/user/login";
    this["userLogout"] = "/user/logout";
    this["categoryTree"] = "/category/tree";
    this["test"] = "/erms/import";
    this["getProjectList"] = "/project/list";
    this["deleteProject"] = "/project/remove";
    this["getDataBaseList"] = "/project/database/list";
    this["newProject"] = "/project/create";
    this["getProjectInfo"] = "/project/detail";
    this["editProject"] = "/project/create";
    this["getRule"] = "/project/coding_policy/detail";
    this["getProperty"] = "/project/coding_policy/get_attributes";
    this["getModuleVersionList"] = "/project/template/version/list";
    this["createModule"] = "/project/template/create";
    this["updateVersion"] = "/template/";
    this["editModule"] = "/template/";
    this["getModuleInfo"] = "/project/template/detail";
    this["saveRule"] = "/project/coding_policy/update";
  });

}).call(this);
