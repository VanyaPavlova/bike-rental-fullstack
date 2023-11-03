import React, { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Rating,
    Button,
    TextField,
    Divider,
    Modal,
    Stack,
    Autocomplete,
    List,
    ListItem,
} from "@mui/material";
import { bikeService } from "../../services/BikesService";
import BookingForm from "../forms/BookingForm";

export const BikesFilter = () => {
    const [bikes, setFilteredBikes] = useState(bikeService.getBikes());
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedBikeId, setSelectedBikeId] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpenBookingForm = (bikeId) => {
        setSelectedBikeId(bikeId);
        setOpen(true);
    };

    const filterBikes = (model, color, rating) => {
        const filtered = bikeService.filterBikes({ model, color, rating });
        setFilteredBikes(filtered);
    };

    const handleModelChange = (event, newValue) => {
        setSelectedModel(newValue);
        filterBikes(newValue, selectedColor, selectedRating);
    };

    const handleColorChange = (event, newValue) => {
        setSelectedColor(newValue);
        filterBikes(selectedModel, newValue, selectedRating);
    };

    const handleRatingChange = (event, newValue) => {
        setSelectedRating(newValue);
        filterBikes(selectedModel, selectedColor, newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography variant="h5" sx={{ m: 5 }}>
                Use these dropdowns to filter bikes by model, color, and rating
            </Typography>
            <Stack sx={{ m: 5 }} direction="row" spacing={2}>
                <Autocomplete
                    id="1"
                    options={bikeService.getDistinctModels()}
                    value={selectedModel}
                    onChange={handleModelChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Model" />}
                />
                <Autocomplete
                    id="2"
                    options={bikeService.getDistinctColors()}
                    value={selectedColor}
                    onChange={handleColorChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Color" />}
                />
                <Autocomplete
                    id="2"
                    options={bikeService.getDistinctRatings()}
                    value={selectedRating}
                    onChange={handleRatingChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Rating" />}
                />
            </Stack>

            <Grid container item xs={12} alignItems="center" justify="space-between">
                {bikes.map((bike) => (
                    <Card key={bike.id} sx={{ m: 5, p: 0, width: 180, height: 220 }}>
                        <CardContent sx={{ height: 170 }}>
                            <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                                {bike.model}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Color: {bike.color}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                                {bike.location}
                            </Typography>
                            <Rating value={bike.rating} readOnly disabled={!bike.isAvailable} />
                        </CardContent>
                        <CardActions>
                            <Button
                                size="medium"
                                variant="contained"
                                disabled={!bike.isAvailable}
                                onClick={() => handleOpenBookingForm(bike.id)}
                            >
                                {bike.isAvailable ? "Book Now" : "Reserved"}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>
            <BookingForm bikeId={selectedBikeId} isOpen={open} onClose={handleClose} />
        </>
    );
};
