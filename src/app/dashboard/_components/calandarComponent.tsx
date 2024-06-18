"use client";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
export default function CalandarComponent() {
  const [ranges, setRanges] = React.useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
    compare: {
      startDate: new Date(),
      endDate: null,
      key: "compare",
    },
  });
  return (
    <DateRange
      onChange={(item) => setRanges({ ...ranges, ...item })}
      maxDate={new Date()}
      direction="vertical"
      ranges={[ranges.selection, ranges.compare]}
    />
  );
}
