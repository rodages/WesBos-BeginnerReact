import React, { Component } from 'react';
import { formatPrice } from "../helpers";

class Order extends Component {
  renderOrder = (key) => {
     const fish = this.props.fishes[key];
     //amount of current fishes
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    //checks if the fish is loaded from local storage before displaying
    if (!fish) return null; 
    if (!isAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available </li>
    }
    return <li key={key}>
      {count}lbs {fish.name}

      {formatPrice(count * fish.price)}
    </li>
}

  render() {
    //getting an array of keys
    const orderIds = Object.keys(this.props.order)

    const total = orderIds.reduce((prevTotal, key) => {
      //current fish
      const fish = this.props.fishes[key];
      //amount of current fishes
      const count = this.props.order[key];
      //bool of if fish item exists AND is available
      const isAvailable = fish && fish.status === "available";
      if (!fish) return null; 
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      } else {
        return prevTotal
      }
     }, 0 );

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">{formatPrice(total)}</div>
      </div>
    );
  }
}

export default Order