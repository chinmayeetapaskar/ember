"use strict";



define('library-app/app', ['exports', 'library-app/resolver', 'ember-load-initializers', 'library-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('library-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('library-app/controllers/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    responseMessage: '',
    //  textMessage: '',
    emailAddress: '',
    message: '',
    headerMessage: 'Comming Soon...',

    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isLongEnough: Ember.computed.gte('message.length', 5),

    isBothTrue: Ember.computed.and('isValid', 'isLongEnough'),
    isDisabled: Ember.computed.not('isBothTrue'),

    actions: {

      sendInvitation() {
        alert(`Send the following message is in progress: ${this.get('emailAddress')} \n ${this.get('message')}`);
        this.set('responseMessage', `Thank you! We've just saved`);
        this.set('emailAddress', '');
        this.set('message', '');
      }
    }

  });
});
define('library-app/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    responseMessage: '',
    emailAddress: '',
    //  isDisabled: empty('emailAddress')
    headerMessage: 'Comming Soon...',
    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isDisabled: Ember.computed.not('isValid'),
    actions: {

      saveInvitation() {
        alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
        this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
        this.set('emailAddress', '');
      }
    }

  });
});
define('library-app/helpers/app-version', ['exports', 'library-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;


  const {
    APP: {
      version
    }
  } = _environment.default;

  function appVersion(_, hash = {}) {
    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('library-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('library-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('library-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'library-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('library-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('library-app/initializers/export-application-global', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("library-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('library-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('library-app/router', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('about');
    this.route('contact');
  });

  exports.default = Router;
});
define('library-app/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('library-app/routes/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('library-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("library-app/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "g/8T9ZnY", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"About Page\"],[9],[0,\"\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LUO7lrt1", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Welcome to Ember\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[14,\"navbar\",[]],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TYin0/Tp", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Contact Page\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"jumbotron text-center\"],[8],[0,\"\\n  \"],[6,\"h1\"],[8],[1,[20,\"headerMessage\"],false],[9],[0,\"\\n\\n  \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n  \"],[6,\"p\"],[8],[0,\"Don't miss our launch date, request an invitation now.\"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-horizontal form-group form-group-lg row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"email\",[22,[\"emailAddress\"]],\"form-control\",\"Please type your e-mail address.\",\"autofocus\"]]],false],[0,\"\\n\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2\"],[8],[0,\"\\n      \"],[1,[26,\"textarea\",null,[[\"value\",\"class\",\"rows\",\"placeholder\",\"autofocus\"],[[22,[\"message\"]],\"form-control\",5,\"Please type your message here.\",\"autofocus\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-lg btn-block\"],[11,\"disabled\",[20,\"isDisabled\"],null],[3,\"action\",[[21,0,[]],\"sendInvitation\"]],[8],[0,\"Send Message\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"responseMessage\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"alert alert-success\"],[8],[1,[20,\"responseMessage\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/contact.hbs" } });
});
define("library-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EKHkKO/9", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Home Page\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"jumbotron text-center\"],[8],[0,\"\\n  \"],[6,\"h1\"],[8],[1,[20,\"headerMessage\"],false],[9],[0,\"\\n\\n  \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n  \"],[6,\"p\"],[8],[0,\"Don't miss our launch date, request an invitation now.\"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-horizontal form-group form-group-lg row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"email\",[22,[\"emailAddress\"]],\"form-control\",\"Please type your e-mail address.\",\"autofocus\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-lg btn-block\"],[11,\"disabled\",[20,\"isDisabled\"],null],[3,\"action\",[[21,0,[]],\"saveInvitation\"]],[8],[0,\"Request invitation\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"responseMessage\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"alert alert-success\"],[8],[1,[20,\"responseMessage\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"br\"],[8],[9],[6,\"br\"],[8],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
define("library-app/templates/navbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7PBbKbUS", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[10,\"class\",\"navbar navbar-inverse\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"navbar-header\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"navbar-toggle collapsed\"],[10,\"data-toggle\",\"collapse\"],[10,\"data-target\",\"#main-navbar\"],[10,\"type\",\"button\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"sr-only\"],[8],[0,\"Toggle navigation\"],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Library App\"]],\"parameters\":[]},null],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"collapse navbar-collapse\"],[10,\"id\",\"main-navbar\"],[8],[0,\"\\n      \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav\"],[8],[0,\"\\n            \"],[4,\"link-to\",[\"index\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[10,\"href\",\"\"],[8],[0,\"Home\"],[9]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"about\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[10,\"href\",\"\"],[8],[0,\"About\"],[9]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"contact\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[10,\"href\",\"\"],[8],[0,\"Contact\"],[9]],\"parameters\":[]},null],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[9],[2,\" /.container-fluid \"],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/navbar.hbs" } });
});


define('library-app/config/environment', [], function() {
  var prefix = 'library-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("library-app/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"name":"library-app","version":"0.0.0+4bab27fe"});
}
//# sourceMappingURL=library-app.map
