"use client";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { useState } from "react";
const ReservationDatePick = ({
  availableAfter,
  formattedDates,
  setFormattedDates,
}) => {
  
  const [dateRange, setDateRange] = useState([null, null]);

  // Parse the availableAfter date to a Day.js object
  const availableAfterDate = dayjs(availableAfter, "ddd, DD MMM YYYY HH:mm:ss [GMT]");

  const shouldDisableDate = (date) => {
    const [startDate] = dateRange;
    const adjustedAvailableAfterDate = availableAfterDate.add(1, 'day');
    if (date.isBefore(adjustedAvailableAfterDate, "day")) {
      return true; // Disable all dates before availableAfter
    }

    // If a start date is selected, restrict the end date to 7 days max
    if (startDate) {
      const maxAllowedDate = dayjs(startDate).add(7, "day"); // Add 7 days to the start date
      return date.isAfter(maxAllowedDate, "day"); // Disable dates beyond the allowed range
    }

    return false; // Allow all other dates
  };

  // Function to handle date range selection and formatting
  const handleDateRangeChange = (newValue) => {
    setDateRange(newValue);

    const formattedStartDate = newValue[0]
      ? dayjs(newValue[0]).toISOString() // Format start date to ISO string
      : null;
    const formattedEndDate = newValue[1]
      ? dayjs(newValue[1]).toISOString() // Format end date to ISO string
      : null;

    setFormattedDates({ start: formattedStartDate, end: formattedEndDate }); // Set formatted dates in state
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          localeText={{ start: "Check-in", end: "Check-out" }}
          value={dateRange} // Bind the value to the state
          onChange={handleDateRangeChange} // Update state with selected date range
          shouldDisableDate={shouldDisableDate} // Disable dates before availableAfter
          sx={{
            "& .MuiInputBase-root": {
              color: "white", // Change the input text color to white
            },
            "& .MuiInputLabel-root": {
              color: "white", // Change the label text color to white
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Change the input border color
            },
            "& .MuiSvgIcon-root": {
              color: "white", // Change the icon color (e.g., calendar icon)
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ReservationDatePick;
