import React, { Component } from "react";
import ScorePicker from './StorePicker'
import Inventory from './Inventory'
import Header from './Header'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from "./Fish"



class App extends Component {
  //creating initial state on the parent component to pass it to children
  state = {
    fishes: {},
    order: {},
  };
  //needs to be passed to a child
  addFish = (fish) => {
    console.log("adding a fish");
    //take a copy of current state via spread
    const fishes = { ...this.state.fishes };
    //add the new fish
    fishes[`fish${Date.now()}`] = fish;
    //set new state to the object
    this.setState({
      //fishes: fishes
      fishes,
    })
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
    })
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
                addToOrder={this.addToOrder} index={key}
                />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;