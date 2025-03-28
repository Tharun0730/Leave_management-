import React, { useState } from 'react';
import { 
  Box, 
  FormControlLabel, 
  useTheme,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  FormControl,
  Snackbar,
  Alert
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SnackBarComponent from '../../components/commonComponents/SnackBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/loginSlice/loginSlice';

const SignupPage = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(true);
  const [admin, setAdmin] = useState(false);
  const dispatch=useDispatch()
  const {loginLoading}=useSelector((state)=>state.loginSlice)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' // 'error', 'warning', 'info', 'success'
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setSnackbar({
        open: true,
        message: 'Email is required',
        severity: 'error'
      });
      return false;
    }
    
    if (!formData.password.trim()) {
      setSnackbar({
        open: true,
        message: 'Password is required',
        severity: 'error'
      });
      return false;
    }
    
    if (!user && !admin) {
      setSnackbar({
        open: true,
        message: 'Please select at least one role (User or Admin)',
        severity: 'error'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    if(admin){
      dispatch(loginUser({...formData,admin:true}))

    }else{
      dispatch(loginUser({...formData,user:true}))
    }

    console.log('Signup data:', formData);
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
   
    //   setSnackbar({
    //     open: true,
    //     message: 'Login successful!',
    //     severity: 'success'
    //   });
    // }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: 
           
          "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "400px",
            margin: "20px 10px",
            padding: { xs: "20px", sm: "30px" },
            maxWidth: "380px",
            borderRadius: "5px",
            // backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <Box sx={{ 
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
          }}>
            <Box>
               <Typography sx={{
                 fontFamily: "Poppins !important",
               }} variant="h6" color="primary">
                Hi, Welcome Back!
              </Typography>
              <Typography sx={{
                 fontFamily: "Poppins !important",
              }} variant="subtitle1">
                Login to your account
              </Typography>
            </Box>
          </Box>
       
          <Box sx={{ 
            display: "flex", 
            justifyContent: "start", 
            width: "100%",
          }}>
            <FormControlLabel
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: {
                      xs: "16px",
                      lg: "19px",
                  },
                },
                "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    fontFamily: "Poppins !important",
                },
                fontSize:"30px"
              }}
              control={
                <Checkbox
                  checked={admin}
                  onChange={(e) => {
                    setAdmin(e.target.checked);
                    if (e.target.checked) setUser(false);
                  }}
                />
              }
              label="Admin"
            />
            <FormControlLabel
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: {
                      xs: "16px",
                      lg: "19px",
                  },
                },
                "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    fontFamily: "Poppins !important",
                },
                fontSize:"30px"
              }}
              control={
                <Checkbox
                  checked={user}
                  onChange={(e) => {
                    setUser(e.target.checked);
                    if (e.target.checked) setAdmin(false);
                  }}
                />
              }
              label="User"
            />
          </Box>
          
          <FormControl
            variant="standard"
            size="large"
            sx={{
              margin: "7px 0px",
              padding: "7px 0",
              width: "100%",
              ".MuiInputBase-input": {
                height: "5px",
              },
            }}
          >
            <InputLabel
              sx={{
                fontSize: "15px",
                fontWeight: "600",
                color: "black",
                fontFamily: "Poppins !important",
              }}
              shrink
              htmlFor="bootstrap-input"
            >
              Email
            </InputLabel>
            <OutlinedInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                margin: "14px 0 0 0",
                "&:focus": {
                  boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                  borderColor: theme.palette.primary.main,
                },
                height: "40px",
                padding: "10px 30px 10px 12px;",
              }}
              placeholder="Enter Email"
            />
          </FormControl>
          
          <FormControl
            variant="standard"
            size="large"
            sx={{
              margin: "7px 0px",
              padding: "7px 0",
              width: "100%",
              ".MuiInputBase-input": {
                height: "5px",
              },
            }}
          >
            <InputLabel
              sx={{
                fontSize: "15px",
                fontWeight: "600",
                color: "black",
                fontFamily: "Poppins !important",
              }}
              shrink
              htmlFor="bootstrap-input"
            >
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                margin: "14px 0 0 0",
                "&:focus": {
                  boxShadow: "rgba(25,118,210,0.25) 0 0 0 0.2rem",
                  borderColor: theme.palette.primary.main,
                },
                height: "40px",
                padding: "10px 30px 10px 12px;",
              }}
            />
          </FormControl>

          <LoadingButton
            fullWidth
            loading={loginLoading}
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2, mb: 2 }}
          >
            Sign in
          </LoadingButton>
{/* 
          <Box sx={{ 
            width: "100%", 
            borderTop: `1px solid ${theme.palette.divider}`,
            pt: 1,
            textAlign: "right"
          }}>
            <Typography variant="caption">
              VERSION: 1.0.0
            </Typography>
          </Box> */}
        </Box>
      </Box>

      <SnackBarComponent snackbar={snackbar} handleCloseSnackbar={handleCloseSnackbar} />
      {/* <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default SignupPage;