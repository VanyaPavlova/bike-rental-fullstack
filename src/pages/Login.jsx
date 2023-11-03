import { Box } from "@mui/material";
import LoginForm from '../components/forms/LoginForm'

export const Login = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="40vh">
            <LoginForm />
        </Box>
    )
}
