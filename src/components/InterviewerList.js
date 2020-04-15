import React from "react";
import classNames from 'classnames';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
/* 
Our InterviewerList takes in three props:

interviewers:array - an array of objects containing the information of each interviewer
interviewer:number - the id of an interviewer
setInterviewer:function - a function that accepts an interviewer id
*/

  const interviewerItems = props.interviewers.map(intObj => {
    return (
      <InterviewerListItem 
        key={intObj.id}
        name={intObj.name} 
        avatar={intObj.avatar}
        selected={props.value === intObj.id}
        setInterviewer={() => props.onChange(intObj.id)}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}