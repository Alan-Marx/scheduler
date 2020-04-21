import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateSpotsRemaining = () => {
    return axios.get('/api/days')
    .then(response => {
      setState(prev => ({
        ...prev, 
        days: response.data
      }));
    })
  }
  
  const setDay = day => setState({ ...state, day});
  
  const bookInterview = (id, interview) => {

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
      setState({
        ...state,
        appointments
      })
    });
  }
  
  const cancelInterview = (id) => {
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
      setState({
        ...state,
        appointments
      })
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
    updateSpotsRemaining
  };
}

