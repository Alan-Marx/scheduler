import React from "react";

import { render, 
         cleanup, 
         waitForElement, 
         fireEvent, 
         getByText,
         getAllByTestId,
         getByAltText,
         getByPlaceholderText,
         queryByText,
         queryByAltText,
         prettyDOM } from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {

  afterEach(cleanup);

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await  waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const firstAppointment = appointments[0];
    fireEvent.click(getByAltText(firstAppointment, "Add"));
    fireEvent.change(getByPlaceholderText(firstAppointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(firstAppointment, "Sylvia Palmer"));
    fireEvent.click(getByText(firstAppointment, "Save"));
    expect(getByText(firstAppointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => queryByText(firstAppointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
      
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
  
    fireEvent.click(getByText(appointment, "Confirm"));
    
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    await waitForElement(() => queryByAltText(appointment, "Add"));
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

})


