import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? 
      <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : 
      <Empty />}
    </article>
  ); 
}