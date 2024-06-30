import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PublicIcon from "@mui/icons-material/Public";
import CustomCard from "./_components/customCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import RevenusChart from "./_components/revenusChart";
import CalandarComponent from "./_components/calandarComponent";
import PieChartComponents from "./_components/pieChartComponents";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
export default async function page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <>
      <div className="w-full flex flex-col gap-5 mt-16">
        <Grid container gap={1}>
          <Grid container xs={12} md={7} rowGap={4} columnGap={2}>
            <Grid item xs={12} md={5}>
              <CustomCard
                data="35.000"
                duration="week"
                icon={<AttachMoneyIcon className="fill-white" />}
                percentage="+31"
                style={{
                  iconBackground: "bg-gradientBlack",
                  persentageColor: "text-green",
                }}
                title="Sales"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomCard
                data="35.000"
                duration="week"
                icon={<PublicIcon className="fill-white" />}
                percentage="+31"
                style={{
                  iconBackground: "bg-gradientBlack",
                  persentageColor: "text-green",
                }}
                title="Revenus"
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <CustomCard
                data="35.000"
                duration="week"
                icon={<AccountCircleIcon className="fill-white" />}
                percentage="+31"
                style={{
                  iconBackground: "bg-gradientBlack",
                  persentageColor: "text-green",
                }}
                title="Commands"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomCard
                data="35.000"
                duration="week"
                icon={<StoreIcon className="fill-white" />}
                percentage="+31"
                style={{
                  iconBackground: "bg-gradientBlack",
                  persentageColor: "text-green",
                }}
                title="Customers"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="overflow-visible w-full">
              <CardContent>
                <Stack direction="row" gap={2} justifyContent={"space-between"}>
                  <div className="bg-gradientBlack rounded-lg p-4 -translate-y-2/3 h-fit">
                    <InsertInvitationIcon className="fill-white stroke-white" />
                  </div>
                  <Typography
                    textAlign={"end"}
                    component={"div"}
                    justifyContent={"space-between"}
                    gap={"1px"}
                  >
                    <Typography variant="subtitle2" className="text-gray">
                      Total Sales
                    </Typography>
                    <Box
                      fontWeight={"fontWeightBold"}
                      fontSize={"h6.fontSize"}
                      className="text-darkBlue"
                    >
                      $ 35.000
                    </Box>
                  </Typography>
                </Stack>
              </CardContent>
              <RevenusChart />
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          textAlign={"center"}
          justifyItems={"center"}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={6}>
            <CalandarComponent />
          </Grid>
          <Grid item xs={12} md={6} textAlign={"center"}>
            <Container className="flex justify-center">
              <PieChartComponents />
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
