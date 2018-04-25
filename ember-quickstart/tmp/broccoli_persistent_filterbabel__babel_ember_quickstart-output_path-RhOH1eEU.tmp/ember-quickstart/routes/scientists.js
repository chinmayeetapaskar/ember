define('ember-quickstart/routes/scientists', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return ['Marie Curie', 'Mae Jemison', 'Albert Hofmann'];
    }
  });
});