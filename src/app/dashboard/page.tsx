import BreadcrumbsComponents from "@/components/dashboard/breadcrumbs";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PublicIcon from "@mui/icons-material/Public";
import CustomCard from "./_components/customCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import RevenusChart from "./_components/revenusChart";
import CalandarComponent from "./_components/calandarComponent";
import PieChartComponents from "./_components/pieChartComponents";
export default async function page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="py-4 px-3 flex-col gap-10 flex-1">
      <BreadcrumbsComponents />
      <div className="w-full flex flex-col gap-5 mt-16 px-8 md:ps-6 md:pe-0">
        <Grid container spacing={4}>
          <Grid container xs={12} md={8} spacing={4}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={"space-between"}
                >
                  <div className="bg-gradientBlack rounded-lg p-4 -translate-y-2/3 h-fit">
                    <AttachMoneyIcon className="fill-white stroke-white" />
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
        <Grid container justifyItems={"center"}>
          <Grid item xs={12} md={6} >
            <CalandarComponent />
          </Grid>
          <Grid item xs={12} md={6}  alignContent={"center"}>
            <PieChartComponents/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
