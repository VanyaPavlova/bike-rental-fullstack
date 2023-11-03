import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../../theme";
import Header from "../header/Header";
import { useUserContext } from "../../context/UserContext";
import DataGrid from "./Grid";

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const UsersList = ({ role = "user" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const { userService } = useUserContext();

  async function fetchData() {
    const managers = await userService.getUsersByRole(role);
    setUsers(managers);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleCreateNewRow() {
    const newUser = userService.createUncommittedUser(role);
    setUsers([...users, newUser]);
    return newUser;
  }

  function handleCancelCommitRow(id) {
    console.log(`Canceling commit for user ${id}`);
    setUsers(users.filter((user) => user.id !== id));
  }

  async function handleUpdateRow(user) {
    if (user.isNew) {
      await userService.createUser(user);
    } else {
      await userService.updateUser(user.id, user);
    }
    await fetchData();
  }

  async function handleDeleteRow(id) {
    console.log(`Deleting user ${id}`);
    await userService.deleteUser(id);
    await fetchData();
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      editable: true,
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      editable: true,
      headerName: "Age",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      editable: true,
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      editable: true,
      headerName: "Email",
      preProcessEditCellProps: ({ props }) => {
        const hasError = !validateEmail(props.value);
        return { ...props, error: hasError };
      },
      flex: 1,
    },
    {
      field: "address",
      editable: true,
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      editable: true,
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      editable: true,
      type: "number",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "role",
      editable: true,
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
  ];

  return (
    <Grid m="20px" width="100%" sx={{ m: 2, p: 2 }}>
      <Header title="Users" subtitle="List of Users for Future Reference" />
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
          rows={users}
          columns={columns}
          createNewRow={handleCreateNewRow}
          cancelCommitRow={handleCancelCommitRow}
          updateRow={handleUpdateRow}
          deleteRow={handleDeleteRow}
        />
      </Grid>
    </Grid>
  );
};

export default UsersList;
