/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    cx = require('react/addons').addons.classSet;


var Cell = React.createClass({
  render: function() {
    var elementInMap = this._getElementFor(this.props.number);
    var classes = cx({
      'character': this.props.isCharacter,
      'unvisited': (elementInMap === '#'),
      'unwalkable': (elementInMap === '$')
    });

    return <td className={classes} onClick={this.cellOnClick}>
      {elementInMap}
    </td>;
  },

  cellOnClick: function() {
    console.log(this.props.number);
  },

  _getElementFor: function(number) {
    if (number < 0) {
      return '#';
    } else if (number === 0 || number === 16) {
      return '$';
    } else {
      return '?';
    }
  }
});

module.exports = Cell;
