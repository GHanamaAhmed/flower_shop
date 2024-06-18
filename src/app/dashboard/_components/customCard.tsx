import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import React from "react";
type CustomCardProps = {
  icon: React.ReactElement<SvgIconComponent>;
  title: string;
  data: string;
  percentage: string;
  style: {
    iconBackground: string;
    persentageColor: string;
  };
  duration: "day" | "week" | "month" | "year";
};

export default function CustomCard({
  icon,
  title,
  data,
  percentage,
  style,
  duration,
}: CustomCardProps) {
  return (
    <Card className="overflow-visible">
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <div
            className={
              style.iconBackground + " rounded-lg p-4 -translate-y-2/3 h-fit"
            }
          >
            {icon}
          </div>
          <Typography
            textAlign={"end"}
            component={"div"}
            justifyContent={"space-between"}
            gap={"1px"}
          >
            <Typography variant="subtitle2" className="text-gray">
              {title}
            </Typography>
            <Box
              fontWeight={"fontWeightBold"}
              fontSize={"h6.fontSize"}
              className="text-darkBlue"
            >
              $ {data}
            </Box>
          </Typography>
        </Stack>
      </CardContent>
      <Divider className="bg-customBackground" />
      <CardContent>
        <Typography variant="subtitle2" className="text-gray flex gap-2">
          <Box
            fontWeight={"fontWeightBold"}
            component={"p"}
            className={style.persentageColor}
          >
            {percentage}
          </Box>
          than last {duration}
        </Typography>
      </CardContent>
    </Card>
  );
}
