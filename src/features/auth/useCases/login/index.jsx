import { motion } from "framer-motion";
import {
  TextField,
  Button,
  Typography,
  FormHelperText,
  Box,
  Card,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useLogin from "./service";

export default function Login() {
  const {
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    data,
    canLogin,
    isErrors,
    errorsMessages,
    handleLogin,
    gotoRegisterPage,
    gotoForgotPasswordPage
  } = useLogin();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isWideScreen = useMediaQuery(theme.breakpoints.up('xl'));

  // Exact colors from register page
  const brandGradient = 'linear-gradient(135deg, #7E66DC 0%, #5A4AE3 100%)';
  const accentYellow = '#F0C441';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: isMobile ? 2 : 3
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{
          width: '100%',
          maxWidth: isMobile ? '100%' : 1000,
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(126, 102, 220, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Branding Section - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{
              flex: 1,
              background: brandGradient,
              color: 'white',
              p: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '2.5rem'
                }}
              >
                DigitalLearn
              </Typography>
              
              <Typography 
                variant="h5"
                sx={{ 
                  opacity: 0.9,
                  mb: 4,
                  fontSize: '1.5rem'
                }}
              >
                Master Digital Culture for the Modern University
              </Typography>
            </Box>
          )}

          {/* Mobile Header - Minimal */}
          {isMobile && (
            <Box sx={{
              background: brandGradient,
              color: 'white',
              py: 3,
              px: 2,
              textAlign: 'center'
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                DigitalLearn
              </Typography>
            </Box>
          )}

          {/* Form Section */}
          <Box sx={{
            flex: 1,
            p: isMobile ? 3 : 6,
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: '#5A4AE3',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile ? '1.75rem' : '2rem'
              }}
            >
              Welcome Back
            </Typography>

            {/* Email Input */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              error={isErrors.email}
              helperText={errorsMessages.email}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#7E66DC'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7E66DC'
                  }
                }
              }}
            />

            {/* Password Input */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              error={isErrors.password}
              helperText={errorsMessages.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: '#7E66DC' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#7E66DC'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7E66DC'
                  }
                }
              }}
            />

            {/* Forgot Password */}
            <Box sx={{  mb: 4 }}>
            
            </Box>

            {/* Login Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                disabled={!canLogin}
                sx={{
                  bgcolor: '#7E66DC',
                  color: 'white',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '1rem',
                  mb: 2,
                  '&:hover': {
                    bgcolor: '#5A4AE3',
                    boxShadow: '0 4px 12px rgba(126, 102, 220, 0.4)'
                  }
                }}
              >
                Login
              </Button>
            </motion.div>

            <Typography
              variant="body2"
              sx={{ 
                textAlign: 'center', 
                mt: 2, 
                color: '#64748B',
                fontSize: '0.875rem'
              }}
            >
              Don't have an account?{' '}
              <Button
                onClick={gotoRegisterPage}
                sx={{
                  color: '#7E66DC',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: '#5A4AE3',
                    background: 'transparent'
                  }
                }}
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}