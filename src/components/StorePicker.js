import React, { Component } from 'react'

class ScorePicker extends Component {
  render() {
      return (
        <React.Fragment>
          <form action="" className="store-selector">
            <h2> please enter a store</h2>
            <input type="text" required placeholder="Store Name" />
            <button type="submit">Visit Store </button>
          </form>
        </React.Fragment>
      ); 
  }
}

export default ScorePicker;