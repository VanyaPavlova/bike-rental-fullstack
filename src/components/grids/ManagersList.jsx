import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useUserContext } from "../../context/UserContext";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../header/Header";

const ManagersList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userService } = useUserContext();
  const [managers, setManagers] = useState([]);

  async function fetchData() {
    const managers = await userService.getUsersByRole("manager");
    setManagers(managers);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleEdit(params) {
    console.log("Edit", params);
  }

  async function handleDelete(params) {
    await userService.deleteUser(params.id);
    await fetchData();
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "manager"
                ? colors.greenAccent[700]
                : colors.blueAccent[700]
            }
            borderRadius="4px"
          >
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(_) => handleEdit(params)}
              sx={{ color: colors.greenAccent[700] }}
            >
              Edit
            </Button>
            <Button
              onClick={(_) => handleDelete(params)}
              sx={{ color: colors.greenAccent[700] }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Grid m="20px" width="100%" sx={{ m: 2, p: 2 }}>
      <Header
        title="Managers"
        subtitle="List of Managers for Future Reference"
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
          rows={managers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Grid>
    </Grid>
  );
};

export default ManagersList;
