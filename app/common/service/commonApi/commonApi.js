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
    this["editProject"] = "/project/update";
    this["getRule"] = "/project/coding_policy/detail";
    this["getProperty"] = "/project/coding_policy/get_attributes";
    this["saveRule"] = "/project/coding_policy/update";
    this["createRule"] = "/project/coding_policy/create";
    this["getRetentionPeriodList"] = "/project/retention_period/list";
    this["getRetentionPeriodId"] = "/project/retention_period/detail";
    this["saveRetentionPeriod"] = "/project/retention_period/create";
    this["saveRetentionPolicy"] = "/project/retention_policy/create";
    this["getRetentionPolicyId"] = "/project/retention_policy/detail";
    this["getRetentionPolicyList"] = "/project/retention_policy/list";
    this["getModuleVersionList"] = "/project/template/version/list";
    this["createModule"] = "/project/template/create";
    this["updateVersion"] = "/project/template/upgrade";
    this["editModule"] = "/project/template/update";
    this["getModuleInfo"] = "/project/template/detail";
    this["getBatchList"] = "/batch/list";
    this["getBatchDetail"] = "/batch/detail";
    this["getServiceList"] = "/job/list";
    this["startService"] = "/job/start";
    this["stopService"] = "/job/stop";
  });

}).call(this);