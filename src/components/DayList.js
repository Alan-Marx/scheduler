import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

/* The three props will be:
  days:Array a list of day objects (each object includes an id, name, and spots)
  day:String the currently selected day
  setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/

  const dayItems = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={() => props.setDay(day.name)}
      />
    );
  });

return <ul>{dayItems}</ul>;
}