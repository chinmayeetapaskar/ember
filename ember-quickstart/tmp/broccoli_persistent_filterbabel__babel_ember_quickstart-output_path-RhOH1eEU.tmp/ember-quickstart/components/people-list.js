define('ember-quickstart/components/people-list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      showPerson(person) {
        alert(person);
      }
    }
  });
});