/* global angular */
/* global TopLevelMenuDirective */
/* global InfoListDirective */
/* global BuilderDirective */
/* global userDetailsFactory */
/* global restApiFactory */
/* global RouteToService */
/* global ConfigurationService */
/* global MiscUtilsService */
/* global staticFilesUri */
/* global $ */
/* global log */

'use strict';

var kobo = angular.module('dkobo', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'ui.utils'
]);

kobo.directive('topLevelMenu', TopLevelMenuDirective);
kobo.directive('infoList', InfoListDirective);
kobo.directive('outsideClick', OutsideClickDirective);
kobo.directive('koboformQuestionLibrary', QuestionLibraryDirective);
kobo.directive('kobocatFormPublisher', KobocatFormPublisherDirective);

kobo.factory('$userDetails', userDetailsFactory);
kobo.factory('$restApi', restApiFactory);

kobo.service('$routeTo', RouteToService);
kobo.service('$configuration', ConfigurationService);
kobo.service('$miscUtils', MiscUtilsService);

kobo.filter('titlecase', TitlecaseFilter);


kobo.config(function ($routeProvider, $locationProvider, $httpProvider) {

        //http://django-angular.readthedocs.org/en/latest/integration.html

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        $routeProvider.when('/forms', {
            templateUrl: staticFilesUri + 'templates/Forms.Template.html',
            controller: 'FormsController'
        });

        $routeProvider.when('/builder/:id', {
            templateUrl: staticFilesUri + 'templates/Builder.Template.html',
            controller: 'BuilderController'
        });

        $routeProvider.when('/library/questions', {
            templateUrl: staticFilesUri + 'templates/QuestionLibrary.Template.html',
            controller: 'AssetsController'
        });

        $routeProvider.when('/library/questions/:id', {
            template: '<section class="form-builder"></section>',
            controller: 'AssetEditorController'
        });

        $routeProvider.when('/admin', {
            templateUrl: staticFilesUri + 'templates/Admin.Template.html',
            controller: 'AdminController'
        });

        $routeProvider.when('/import/csv', {
            templateUrl: staticFilesUri + 'templates/ImportCSV.Template.html',
            controller: 'ImportController'
        });

        $routeProvider.otherwise({
            redirectTo: '/forms'
        });
    });

kobo.run(function ($http, $cookies, $miscUtils) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
    $(function () {
        $('.alert-modal').dialog({
            autoOpen: false,
            modal: true
        });

        // forms__list poshytip effect on publish button
        $('.forms__poshytip').poshytip({
            className: 'tip__rightarrow',
            showTimeout: 1,
            alignTo: 'target',
            offsetX: 10,
            offsetY: -16,
            liveEvents: true
        });

        // question mark poshytip effect (in form__settings)
        $('span.poshytip').poshytip({
            className: 'tip__bottomarrow',
            showTimeout: 1,
            alignTo: 'target',
            alignX: 'right',
            alignY: 'inner-bottom',
            liveEvents: true
        });
    });
    // jQuery.fileupload for importing forms to the user's form list.
});