import React, { Component } from "react";
import PropTypes from "prop-types";
import ScorePicker from "./StorePicker";
import Inventory from "./Inventory";
import Header from "./Header";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends Component {
  //creating initial state on the parent component to pass it to children
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  //will run once App component is displayed
  componentDidMount() {
    const { params } = this.props.match;
    //load data from localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      //setting state of order after converting string to object
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    //reference to the instance of the store @ database
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      //what is being synced
      state: "fishes",
    });
  }

  componentWillUnmount() {
    //prevent memory leak by unmounting the ref to selected store once current instance of App is not active
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    //key on the left, value on the right, JSON.stringify will help to store object in a string
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  //needs to be passed to a child
  addFish = (fish) => {
    //take a copy of current state via spread
    const fishes = { ...this.state.fishes };
    //add the new fish
    fishes[`fish${Date.now()}`] = fish;
    //set new state to the object
    this.setState({
      //fishes: fishes
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //Take a copy of state
    const order = { ...this.state.order };
    //either add to order or update in our order
    order[key] = order[key] + 1 || 1;
    //Call setstate to update
    this.setState({
      order,
    });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                //have to pass key as index in order to have access to it, key={key} does not let access this.props.key, but this.props.index is ok
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
