'use strict';

var forIn = require('lodash/object').forIn,
  domClear = require('min-dom/lib/clear'),
  domify = require('min-dom/lib/domify')
  ;

require('./style.scss');

function SideTabs(canvas, sideTabsProvider){
  this._canvas = canvas;
  this._sideTabsProvider = sideTabsProvider;
  this._init();
}

SideTabs.$inject = [
  'canvas',
  'sideTabsProvider'
];


SideTabs.prototype._init = function(){
  this._drawContainer();
  this._update();
  //this._createDelegates();
};

SideTabs.prototype._drawContainer = function(){
  var container = this._canvas.getContainer();

  this._sidetabsContainer = domify(SideTabs.HTML_MARKUP);

  container.insertBefore(this._sidetabsContainer, container.childNodes[0]);
};

SideTabs.prototype._drawEntries = function () {
  var that = this,
    actions = this._actions = this._sideTabsProvider.getSideTabsEntries();
  forIn(actions, function (action, id) {
    that._drawEntry.call(that, action, id);
  });
};

SideTabs.prototype._update = function () {
  if (this._paletteEntries) {
    domClear(this._paletteEntries);
  }
  this._drawEntries();
};

/* markup definition */

SideTabs.HTML_MARKUP =
  '<div class="pfdjs-st-container">' +
  '  <div class="pfdjs-st-tabs">' +
  '  </div>' +
  '  <div class="pfdjs-st-contents">' +
  '  </div>' +
  '</div>';

module.exports = SideTabs;