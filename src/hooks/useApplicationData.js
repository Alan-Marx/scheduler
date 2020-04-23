import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(values => {
        setState(prev => ({
          ...prev, 
          days: values[0].data,
          appointments: values[1].data,
          interviewers: values[2].data
       }))
    });
  }, [])

 // if argument is true, this means that a new appointment has been added. If false, that an existing appointment has been deleted.
  const updateSpotsRemaining = (arg) => {
    const daysArr = state.days;
    const dayObj = daysArr.find(day => day.name === state.day);
    if (arg) {
      dayObj.spots--;
    } else {
      dayObj.spots++;
    }
    daysArr[dayObj.id - 1] = dayObj;
    return daysArr;
  }
  
  const setDay = day => setState({ ...state, day});

  const bookInterview = (id, interview) => {
    const days = !state.appointments[id].interview ? updateSpotsRemaining(true) : state.days;
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(prev => ({
        ...prev,
        days,
        appointments
      }))
    });
  }
  
  const cancelInterview = (id) => {
    const days = updateSpotsRemaining(false);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({
        ...prev,
        days,
        appointments
      }))
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

