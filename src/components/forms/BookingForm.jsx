import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { bookingService } from "../../services/BookingService";
import { useUserContext } from "../../context/UserContext";

const BookingForm = ({ bikeId, isOpen, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { currentUser } = useUserContext();

  const handleBookNow = () => {
    if (currentUser) {
      // Check if the user is logged in
      bookingService.bookRental(currentUser.id, bikeId, startDate, endDate);

      // Close the modal
      onClose();
    } else {
      console.error("User is not logged in.");
      // Handle the case where the user is not logged in (e.g., display an error message)
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #eaeaea",
    boxShadow: 24,
    p: 5,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {" "}
          Select dates{" "}
        </Typography>
        <Divider />

        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          {" "}
          Start Date:{" "}
        </Typography>
        <TextField
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: 315, mb: 2 }}
          inputProps={{ min: "your-min-date", max: "your-max-date" }}
        />

        <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
          {" "}
          End Date:{" "}
        </Typography>
        <TextField
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ width: 315 }}
          inputProps={{ min: "your-min-date", max: "your-max-date" }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: 3, mb: 2 }}
        >
          <Button
            size="medium"
            variant="contained"
            sx={{ width: 100, height: 50 }}
            onClick={handleBookNow}
          >
            Confirm
          </Button>
          <Button
            size="medium"
            variant="contained"
            sx={{ width: 100, height: 50 }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingForm;
