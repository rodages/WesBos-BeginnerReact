import React, { Component } from "react";
import ScorePicker from './StorePicker'
import Inventory from './Inventory'
import Header from './Header'
import Order from './Order'
import sampleFishes from '../sample-fishes'



class App extends Component {
    //creating initial state on the parent component to pass it to children
    state = {
        fishes: {},
        order: {}
    }
    //needs to be passed to a child
    addFish = fish => {
        console.log("adding a fish");
        //take a copy of current state via spread
        const fishes = { ...this.state.fishes }
        //add the new fish
        fishes[`fish${Date.now()}`] = fish;
        //set new state to the object
        this.setState({
            //fishes: fishes
            fishes,
        })
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes})
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={ this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;