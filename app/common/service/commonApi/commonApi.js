// Generated by CoffeeScript 1.9.1
(function() {
  angular.module("myApp").service("hsAPI", function() {
    this["upload"] = "/upload";
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
    this["getAttributeList"] = "/project/template//attribute/list";
    this["createShowTemplate"] = "/project/template/show/create";
    this["getShowTemplate"] = "/project/template/show/detail";
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
    this["getSysAttr"] = "/project/template/system_attribute/list";
    this["exportModuke"] = "/project/template/download";
    this["exportSample"] = "/project/template/sample";
    this["getBatchList"] = "/batch/list";
    this["getBatchDetail"] = "/batch/detail";
    this["getErrorList"] = "/exception/exception_record/detail";
    this["getErrorGridData"] = "/exception/exception_item/list";
    this["exportBatchList"] = "/batch/export";
    this["getPackageList"] = "/batch/package/list";
    this["deleteBatch"] = "/batch/delete";
    this["checkForceSwitch"] = "/batch/force_transfer/check";
    this["forceSwitch"] = "/batch/force_transfer/excute";
    this["getServiceList"] = "/job/list";
    this["startService"] = "/job/start";
    this["stopService"] = "/job/stop";
    this["getErmsMissionList"] = "/erms_import_task/detail";
    this["getRecordList"] = "/record/list";
    this["recordExportList"] = "/record/export";
    this["getUnitData"] = "/record/list/sourceUnit";
    this["getSourceData"] = "/record/list/systemName";
    this["getRecordCount"] = "/record/count";
    this["getRecordDetail"] = "/record/detail";
    this["recordDownload"] = "/record/download";
    this["getRecordJson"] = "/record/json";
    this["getTopTenData"] = "/statistics/dept";
    this["getSystemName"] = "/statistics/systemName";
    this["getRecordNum"] = "/statistics/overall";
    this["getYearList"] = "/statistics/year";
  });

}).call(this);

//# sourceMappingURL=commonApi.js.map
