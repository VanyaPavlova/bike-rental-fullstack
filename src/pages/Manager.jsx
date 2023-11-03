import { Box, Tab } from "@mui/material";
import { useState } from "react";
import UsersList from "../components/grids/UsersList";
import BookingsList from "../components/grids/BookingsList";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import BikesList from "../components/grids/BikesList";

export const Manager = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState("1");

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
      <TabContext value={currentTabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="Bike Rental Tabs">
            <Tab label="Users" value="1" />
            <Tab label="Managers" value="2" />
            <Tab label="Bikes" value="3" />
            <Tab label="Bookings" value="4" />
          </TabList>
        </Box>
      </TabContext>
      {currentTabIndex.toString() === "1" && (
        <Box sx={{ p: 3 }}>
          <UsersList role="user" />
        </Box>
      )}
      {currentTabIndex.toString() === "2" && (
        <Box sx={{ p: 3 }}>
          <UsersList role="manager" />
        </Box>
      )}
      {currentTabIndex.toString() === "3" && (
        <Box sx={{ p: 3 }}>
          <BikesList />
        </Box>
      )}
      {currentTabIndex.toString() === "4" && (
        <Box sx={{ p: 3 }}>
          <BookingsList />
        </Box>
      )}
    </>
  );
};
