import { Grid, Checkbox, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../header/Header";
import { useTheme } from "@mui/material";
import { bikeService } from "../../services/BikesService";

const BikesList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let bikes = bikeService.getBikes();

    const columns = [
        {
            field: "model",
            headerName: "Model",
            flex: 1,
            cellClassName: "Model-column--cell",
        },
        {
            field: "color",
            headerName: "Color",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
        },
        {
            field: "isAvailable",
            headerName: "Availability",
            flex: 1,
            renderCell: ({ row: { isAvailable } }) => {
                return (
                    <Checkbox checked={isAvailable} value={isAvailable} />
                );
            },
        },
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
                return (
                    <>
                        <Button sx={{ color: colors.greenAccent[700] }}>
                            Edit
                        </Button>
                        <Button sx={{ color: colors.greenAccent[700], mr: 2 }}>
                            Delete
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <Grid m="20px" width="100%" sx={{ m: 2, p: 2 }}>
            <Header
                title="Bikes"
                subtitle="List of Bikes for Future Reference"
            />
            <Grid
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={bikes}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Grid>
        </Grid>
    );
};

export default BikesList;
