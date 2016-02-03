(function(module) {
try {
  module = angular.module('wirknPartials');
} catch (e) {
  module = angular.module('wirknPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/details.html',
    '<div class="job-header" style="background-image: url(\'{{job.cover_images[0]}}\');">\n' +
    '    <div>\n' +
    '        <!-- BACK ARROW -->\n' +
    '        <div class="back-icon">\n' +
    '            <a href="#/{{currentLocale}}" onclick="window.history.go(-1);return false;"><i class="fa fa-chevron-left"></i><span>Back</span></a>\n' +
    '        </div>\n' +
    '        <!-- JOB INFO BAR -->\n' +
    '        <div>\n' +
    '            <div class="col-md-12 job-header-text" ng-model="joblist">\n' +
    '                <div class="job-header-title">{{job.title}}</div>\n' +
    '                <div class="lightweight">\n' +
    '                    {{job.employer.name}}<br>\n' +
    '                    <i class="fa fa-map-marker"></i> {{job.location.address}},{{job.location.city}},{{job.location.province}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="container job-body">\n' +
    '    <div class="row">\n' +
    '        <div class="data-box-outer">\n' +
    '            <div class="col-md-12 data-box details-data-box">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-md-12 job-body-heading">\n' +
    '                        {{"partials.details.Role" | translate}}\n' +
    '                    </div>\n' +
    '                    <div class="col-md-12">\n' +
    '                        {{job.title}} {{"partials.details.At" | translate}} {{job.employer.name}}\n' +
    '                    </div>\n' +
    '                    <br>\n' +
    '                    <div class="col-md-12 job-body-heading">\n' +
    '                        {{"partials.details.JobType" | translate}}\n' +
    '                    </div>\n' +
    '                    <div class="col-md-12">\n' +
    '                        {{job.employment_type}}\n' +
    '                    </div>\n' +
    '                    <br>\n' +
    '                    <div class="col-md-12 job-body-heading">\n' +
    '                        {{"partials.details.Location" | translate}}\n' +
    '                    </div>\n' +
    '                    <div class="col-md-12">\n' +
    '                        <a class="underline" href="http://maps.google.com/?q={{job.location.address}}">{{job.location.address}},{{job.location.city}},{{job.location.province}}</a>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="clearfix"></div>\n' +
    '        <div class="data-box-outer">\n' +
    '            <div class="col-md-12 data-box job-body-details details-data-box">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-md-12 job-body-heading">\n' +
    '                        {{"partials.details.JobDetails" | translate}}\n' +
    '                    </div>\n' +
    '                    <div class="col-md-12">\n' +
    '                        <div ng-bind-html="job.description | simpleFormat"></div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="quick-apply">\n' +
    '    <div class="container">\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-12">\n' +
    '                <img class="kik-wirkn-logo" ng-src="/images/wirkn-logo-icon.png" alt="Wirkn logo icon" />\n' +
    '                <div class="quick-apply-text">\n' +
    '                    <b>QUICK APPLY</b><br>\n' +
    '                    <span class="lightweight">Create a Wirkn video application!</span>\n' +
    '                </div>\n' +
    '\n' +
    '                <a class="quick-apply-link" ng-click="applyNow()">\n' +
    '                    <button id="kik_branch_button" class="quick-apply-btn">APPLY NOW</button>\n' +
    '                </a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('wirknPartials');
} catch (e) {
  module = angular.module('wirknPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/list.html',
    '<nav class="header">\n' +
    '    <div class="container text-center">\n' +
    '        <div class="row">\n' +
    '            <div class="col-xs-3"><img class="kik-wirkn-logo" ng-src="images/wirkn-logo-icon.png" alt="Wirkn logo icon" /></div>\n' +
    '            <div class="col-xs-6">{{"partials.list.JobsIn" | translate}} <span class="in-city"> {{city}}</span></div>\n' +
    '            <div class="col-xs-3">\n' +
    '                <a href="#/{{currentLocale}}/search" class="pull-right"><i class="fa fa-search header-icons"></i></a>\n' +
    '                <a href="#/{{currentLocale}}/location" class="pull-right"><i class="fa fa-map-marker header-icons"></i></a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</nav>\n' +
    '<div class="offset" id="top-bar"></div>\n' +
    '<div ng-if="searchTermVisible">\n' +
    '    <div class="offset-short"></div>\n' +
    '    <div class="filter">\n' +
    '        <div class="container text-center">\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-12">\n' +
    '                    <b>{{"partials.list.SearchTerm" | translate}}</b>: {{searchTerm}} \n' +
    '                    <a href="#/{{currentLocale}}/list" class="pull-right">\n' +
    '                        <span class="fa fa-times-circle search-term-close" aria-hidden="true"></span>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '   </div>\n' +
    '</div>\n' +
    '<div class="container">\n' +
    '    <div class="row scroll">\n' +
    '        <div class="col-md-12 data-box">\n' +
    '            <input type="text" name="search" id="search" placeholder="{{\'partials.list.Filter\' | translate}}" class="search" ng-model="query"/>\n' +
    '        </div>\n' +
    '        <div infinite-scroll="getMoreJobs()"\n' +
    '             infinite-scroll-distance="6"\n' +
    '             infinite-scroll-immediate-check="false"\n' +
    '             infinite-scroll-disabled="pauseScroll">\n' +
    '            <div class=\'text-center pre-load\'>\n' +
    '                <img ng-src="/images/graphic.svg" style="margin-top:30px;">\n' +
    '            </div>\n' +
    '            <div ng-repeat="item in joblist | filter:query" id="item_{{joblist.indexOf(item)}}"><!-- | limitTo: 3 -->\n' +
    '                <a href="#/{{currentLocale}}/details/{{item._id}}">\n' +
    '                    <div class="col-md-12 job-box">\n' +
    '                        <div class="data-text">\n' +
    '                            <div class="title">{{item.title}}</div>\n' +
    '                            <div class="">{{item.employer.name}}</div>\n' +
    '                            <div class="address">\n' +
    '                                <i class="fa fa-map-marker"></i>\n' +
    '                                <span>{{item.distance/1000 | number:2}}  km away</span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="data-img" back-img="{{item.cover_images[0]}}"></div>\n' +
    '                    </div>\n' +
    '                </a>\n' +
    '            </div>\n' +
    '            <div class="clearfix"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<script type="text/ng-template" id="myModalContent.html">\n' +
    '    <div class="personality-modal">\n' +
    '        <img class="modal-image" ng-src="{{message.image}}" alt="">\n' +
    '        <div class="modal-header">\n' +
    '            <h3 class="modal-title">{{message.title | translate}}</h3>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <p>{{message.body | translate}}</p>\n' +
    '        </div>\n' +
    '        <div class="modal-footer">\n' +
    '            <div class="row">\n' +
    '                <div class="col-xs-6">\n' +
    '                    <button class="modal-buttons share" type="button" ng-click="ok()">{{"partials.list.Share" | translate}}</button>\n' +
    '                </div>\n' +
    '                <div class="col-xs-6">\n' +
    '                    <button class="modal-buttons show-jobs" type="button" ng-click="cancel()">{{"partials.list.ShowJobs" | translate}}</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</script>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('wirknPartials');
} catch (e) {
  module = angular.module('wirknPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/location.html',
    '<nav class="header">\n' +
    '    <div class="container">\n' +
    '        <div class="row">\n' +
    '            <div class="col-xs-10">\n' +
    '                <i class="fa fa-map-marker header-icons"></i>\n' +
    '                <input focus="true" type="text" placeholder="{{\'partials.location.LocationPlaceholder\' | translate}}" class="header-input" ng-model="query" ng-keyup="getSuggestions(query)">\n' +
    '            </div>\n' +
    '            <div class="col-xs-2">\n' +
    '                <a href="#/{{currentLocale}}/list" onclick="history.go(-1);return false;" class="pull-right"><i class="fa fa-times-circle header-icons"></i></a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</nav>\n' +
    '<div id="top-bar" class="offset"></div>\n' +
    '<div>\n' +
    '    <ul>\n' +
    '        <li class="search-term">\n' +
    '            <p class="search-label use-current-location" ng-click="useCurrentLocation()">\n' +
    '                <i class="fa fa-location-arrow"></i>\n' +
    '                {{"partials.location.UseCurrentLocation" | translate}}\n' +
    '            </p>\n' +
    '        </li>\n' +
    '        <li class="search-term"><p class="search-label">{{"partials.location.Locations" | translate}}</p></li>\n' +
    '        <li ng-repeat="pred in response" class="search-term">\n' +
    '            <a href ng-click="getCoordinates(pred)">\n' +
    '                <span class="search-name">{{pred.description}}</span>\n' +
    '            </a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('wirknPartials');
} catch (e) {
  module = angular.module('wirknPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partials/search.html',
    '<nav class="header">\n' +
    '    <div class="container">\n' +
    '        <div class="row">\n' +
    '            <div class="col-xs-8">\n' +
    '                <i class="fa fa-search header-icons"></i>\n' +
    '                <!--{{"partials.search.SearchJobs" | translate}}-->\n' +
    '                <input focus="true" type="text" placeholder="{{\'partials.search.SearchJobs\' | translate}}" class="header-input" ng-model="keyword" ng-keyup="getSuggestions(keyword)">\n' +
    '            </div>\n' +
    '            <div class="col-xs-4">\n' +
    '                <a href="#/{{currentLocale}}/list" onclick="history.go(-1);return false;" class="pull-right"><i class="fa fa-times-circle header-icons"></i></a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</nav>\n' +
    '<div class="search-terms">\n' +
    '    <ul>\n' +
    '        <li class="search-term"><p class="search-label">{{"partials.search.Categories" | translate}}</p></li>\n' +
    '        <div ng-show="categoryVisible">\n' +
    '            <li ng-repeat="item in categories" class="search-term">\n' +
    '                <a href="#/{{currentLocale}}/list/{{item.term}}">\n' +
    '                    <img class="search-image" ng-src="/images/pngs/{{item.image}}.png" alt="">\n' +
    '                    <span class="search-name">{{item.name | translate}}</span>\n' +
    '                </a>\n' +
    '            </li>\n' +
    '        </div>\n' +
    '        <div ng-show="!categoryVisible">\n' +
    '            <li ng-repeat="item in suggestions" class="search-term">\n' +
    '                <a href="#/{{currentLocale}}/list/{{item.title}}">\n' +
    '                    <span class="search-name">{{item.title}}</span>\n' +
    '                </a>\n' +
    '            </li>\n' +
    '        </div>\n' +
    '    </ul>\n' +
    '</div>\n' +
    '');
}]);
})();
