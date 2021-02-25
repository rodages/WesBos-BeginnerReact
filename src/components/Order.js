import React, { Component } from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    //amount of current fishes
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    //checks if the fish is loaded from local storage before displaying
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
  };
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available{" "}
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition {...transitionOptions}
              >
                <span>{count} </span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    //getting an array of keys
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      //current fish
      const fish = this.props.fishes[key];
      //amount of current fishes
      const count = this.props.order[key];
      //bool of if fish item exists AND is available
      const isAvailable = fish && fish.status === "available";
      if (!fish) return null;
      if (isAvailable) {
        return prevTotal + count * fish.price;
      } else {
        return prevTotal;
      }
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">{formatPrice(total)}</div>
      </div>
    );
  }
}

export default Order;
