

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