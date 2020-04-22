import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateSpotsRemaining = (arg) => {
    const days = state.days;
    const dayObj = days.find(day => day.name === state.day);
    if (arg) {
      dayObj.spots--;
    } else {
      dayObj.spots++;
    }
    days[dayObj.id - 1] = dayObj;
    return days;

    // return axios.get('/api/days')
    // .then(response => {
    //   setState(prev => ({
    //     ...prev, 
    //     days: response.data
    //   }));
    // })
  }
  
  const setDay = day => setState({ ...state, day});
  
  const bookInterview = (id, interview) => {
    let days;
    if (!state.appointments[id].interview) {
      days = updateSpotsRemaining(true);
    } else {
      days = state.days;
    }
  
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


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

