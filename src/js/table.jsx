var _ = require("lodash");
var React = require("react");

var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var DragDropContext = require('react-dnd').DragDropContext;
var Row = require("./row.jsx");

var App = React.createClass({
    getInitialState: function() {
        return {rows: [{id: "1"}, {id: "2"}, {id: "3"}]};
    },

    moveRow: function(id, afterId) {
        var self = this;
        var rows = _.clone(self.state.rows);

        var currentRow = _.filter(rows, function (r) { return r.id === id;})[0];
        var afterRow = _.filter(rows, function (r) { return r.id === afterId;})[0];

        var currentRowIndex = rows.indexOf(currentRow);
        var afterRowIndex = rows.indexOf(afterRow);

        // remove the current row
        rows.splice(currentRowIndex, 1);
        // put it after
        rows.splice(afterRowIndex, 0, currentRow);

        this.setState({rows: rows});
    },

    render: function() {
        var self = this;

        var rows = this.state.rows.map(function (r) {
              return <Row key={r.id} id={r.id} moveRow={self.moveRow} />;
        });

          return (
              <table style={{width: "200px", height: "100px"}}>
                  <tbody>
                  {rows}
                  </tbody>
              </table>
          );
    }
});

module.exports = DragDropContext(HTML5Backend)(App);

