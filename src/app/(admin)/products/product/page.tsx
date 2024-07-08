"use client";
import { Autocomplete, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useMutation } from "react-query";

export default function Page() {
  const [categorys, setCategorys] = React.useState<string[]>([]);
  const [name, setName] = React.useState<string>("");
  const [time, setTime] = React.useState<NodeJS.Timeout>();
  const { isLoading, mutate: fetchCategory } = useMutation({
    mutationFn: async (name: string) =>
      await fetch("/api/products/categories?name=" + name).then((res) =>
        res.json()
      ),
    onSuccess: (data) => setCategorys(data),
  });
  return (
    <Stack bgcolor={"white"} padding={"50px"}>
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent={"space-between"}
        gap={{
          xs: 2,
          md: 4,
        }}
      >
        <TextField
          type="text"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Autocomplete
          fullWidth
          options={categorys}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              onFocus={() => fetchCategory(name)}
              onChange={(e) => {
                if (time) {
                  clearTimeout(time);
                }
                setTime(
                  setTimeout(() => {
                    fetchCategory(e.target.value);
                  }, 1000)
                );
              }}
              label="Category"
              {...params}
            />
          )}
        />
      </Stack>
      
    </Stack>
  );
}
