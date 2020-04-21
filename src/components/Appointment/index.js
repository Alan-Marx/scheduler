import "components/Appointment/styles.scss";
import React from "react";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"; 
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => props.updateSpotsRemaining())
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteInterview = (id) => {
    transition(DELETING, true);
    props.cancelInterview(id)
    .then(() => props.updateSpotsRemaining())
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={() => deleteInterview(props.id)}
        /> )}
      {mode === ERROR_SAVE && <Error message="The appointment could not be saved." onClose={() => back()}/> }
      {mode === ERROR_DELETE && <Error message="The appointment could not be deleted." onClose={() => back()}/> }
    </article>
  ); 
}