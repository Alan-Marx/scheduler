

export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.filter(dayObj => dayObj.name === day);

  if (filteredDay.length === 0) {
    return [];
  }
  
  const dayAppointments = [...filteredDay[0].appointments];
  const filteredAppointments = [];

  for (let num in state.appointments) {
    if (dayAppointments.includes(state.appointments[num].id)) {
      filteredAppointments.push(state.appointments[num]);
    }
  }
  
  return filteredAppointments;
}

export function getInterviewersForDay(state, day) {

  const filteredDay = state.days.filter(dayObj => dayObj.name === day);

  if (filteredDay.length === 0) {
    return [];
  }

  const dayInterviewers = [...filteredDay[0].interviewers];
  const filteredInterviewers = [];

  for (let num in state.interviewers) {
    if (dayInterviewers.includes(state.interviewers[num].id)) {
      filteredInterviewers.push(state.interviewers[num]);
    }
  }

  return filteredInterviewers;
}



export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  for (let num in state.interviewers) {
    if (state.interviewers[num].id === interview.interviewer) {
      return { ...interview, interviewer: state.interviewers[num] };
    }
  }
}

