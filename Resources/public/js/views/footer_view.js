// Generated by CoffeeScript 1.4.0
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view'], function(View) {
  'use strict';

  var FooterView;
  return FooterView = (function(_super) {

    __extends(FooterView, _super);

    function FooterView() {
      this.renderCounter = __bind(this.renderCounter, this);

      this.updateFilterer = __bind(this.updateFilterer, this);

      this.render = __bind(this.render, this);
      return FooterView.__super__.constructor.apply(this, arguments);
    }

    FooterView.prototype.el = '#footer';

    FooterView.prototype.autoRender = true;

    FooterView.prototype.initialize = function() {
      FooterView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('todos:filter', this.updateFilterer);
      this.listenTo(this.collection, 'all', this.renderCounter);
      return this.delegate('click', '#clear-completed', this.clearCompleted);
    };

    FooterView.prototype.render = function() {
      FooterView.__super__.render.apply(this, arguments);
      return this.renderCounter();
    };

    FooterView.prototype.updateFilterer = function(filterer) {
      if (filterer === 'all') {
        filterer = '.';
      }
      return this.$('#filters a').removeClass('selected').filter("[href='" + filterer + "']").addClass('selected');
    };

    FooterView.prototype.renderCounter = function() {
      var active, completed, countDescription, total;
      total = this.collection.length;
      active = this.collection.getActive().length;
      completed = this.collection.getCompleted().length;
      this.$('#todo-count > strong').html(active);
      countDescription = (active === 1 ? 'item' : 'items');
      this.$('.todo-count-title').text(countDescription);
      this.$('#completed-count').html("(" + completed + ")");
      this.$('#clear-completed').toggle(completed > 0);
      return this.$el.toggle(total > 0);
    };

    FooterView.prototype.clearCompleted = function() {
      return this.publishEvent('todos:clear');
    };

    return FooterView;

  })(View);
});