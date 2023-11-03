import { Box } from "@mui/material";
import RegisterForm from '../components/forms/RegisterForm';

export const Register = () => {
    return (
        <Box
            display="grid"
            justifyItems="center"
            alignItems="center"
            minHeight="55vh">
            <RegisterForm />
        </Box>
    )
}
