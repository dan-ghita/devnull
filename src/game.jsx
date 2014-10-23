/** @jsx React.DOM */
/* global document */


var React = require('react'),
    Party = require('./components/party.jsx'),
    CharTemplate = require('./components/chartemplate.jsx'),
    CreateCharacter = require('./components/create-char.jsx'),
    CurrentCharacter = require('./components/current-char.jsx'),
    Level = require('./components/level.jsx'),
    ControlCharMixin = require('./mixins/control-char.js'),
    Map = require('./components/map.jsx'),
    _ = require('lodash');

var Game = React.createClass({
  mixins: [ControlCharMixin],

  getInitialState: function() {
    var m = [];
    for (var i=0; i<100; i++) {
      m.push([])
      for (var j=0; j<100; j++) {
        m[i].push(0);
      }
    }

    return {
      currentChar: "",
      maxX: 50,
      maxY: 50,
      bigMap: m,
      currentX: 0,
      currentY: 0
    };
  },

  render: function() {
    return <div className="flex-container">
      <div className="flex-item">
        <CreateCharacter />
        <CharTemplate />
      </div>
      <div className="flex-item">
        <Party onCallback={this.onCharacterSelect} />
        <CurrentCharacter currentChar={this.state.currentChar} />
      </div>
      <div className="flex-map">
        <Map area={this.state.bigMap}
             currentX={this.state.currentX}
             currentY={this.state.currentY} />
        <Level currentChar={this.state.currentChar}
               onReceiveLevel={this.onReceiveLevel} />
      </div>
    </div>;
  },

  onCharacterSelect: function(character) {
    this.setState({currentChar: character});
  },

  onReceiveLevel: function(level) {
    var nextMap = _.clone(this.state.bigMap);
    var receivedMap = level.area;
    for (var i=0; i<receivedMap[0].length; i++)
      for (var j=0; j<receivedMap.length; j++)
        nextMap[level.bx + i][level.by + j] = receivedMap[i][j];
    this.setState({bigMap: nextMap});
  }
});


// For the toolbar
window.React = React;

React.renderComponent(
  <Game />,
  document.getElementById('container')
);
