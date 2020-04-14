import React from "react";

import "components/DayListItem.scss";

import classNames from 'classnames';

export default function DayListItem(props) {

  const formatSpots = () => {
    let number = props.spots;
    if (number > 1) {
      return `${number} spots remaining`;
    } else if (number === 1) {
      return `1 spot remaining`;
    } else {
      return `no spots remaining`;
    }
  }

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
  
}