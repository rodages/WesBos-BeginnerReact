import React, { Component } from 'react';
import PropTypes from "prop-types";
import { getFunName } from '../helpers';


class ScorePicker extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  //creates empty ref
  myInput = React.createRef();

  goToStore = (e) => {
    e.preventDefault();
    //gets text from input
    const storeName = this.myInput.current.value;
    //goes to /store/:storeid
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <React.Fragment>
        <form action="" className="store-selector" onSubmit={this.goToStore}>
          <h2> Please Enter a Store</h2>
          <input
            type="text"
            //attaches value to empty ref created at the top of the class comp
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ScorePicker;