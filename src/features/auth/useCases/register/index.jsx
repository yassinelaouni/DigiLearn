import { motion } from "framer-motion";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,
  Card,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useRegister from "./service";

export default function Register() {
  const {
    showPassword,
    showPasswordConfirmation,
    data,
    canRegister,
    isErrors,
    errorsMessages,
    handleChange,
    showPasswordHandler,
    passwordMouseDownHandler,
    handleRegister,
    showPassworConfirmationdHandler,
    passwordConfirmationMouseDownHandler,
    gotoLoginPage
  } = useRegister();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Color constants
  const primaryPurple = '#7E66DC';
  const darkPurple = '#5A4AE3';
  const accentYellow = '#F0C441';
  const brandGradient = `linear-gradient(135deg, ${primaryPurple} 0%, ${darkPurple} 100%)`;


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
              Create Your Account
            </Typography>

            {/* First Name */}
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              error={isErrors.firstName}
              helperText={errorsMessages.firstName}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: primaryPurple
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryPurple
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: primaryPurple
                }
              }}
            />

            {/* Last Name */}
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              error={isErrors.lastName}
              helperText={errorsMessages.lastName}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: primaryPurple
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryPurple
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: primaryPurple
                }
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
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
                    borderColor: primaryPurple
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryPurple
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: primaryPurple
                }
              }}
            />

            {/* Password */}
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
                      onClick={showPasswordHandler}
                      onMouseDown={passwordMouseDownHandler}
                      edge="end"
                      sx={{ color: '#7E66DC' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: primaryPurple
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryPurple
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: primaryPurple
                }
              }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="passwordConfirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              value={data.passwordConfirmation}
              onChange={handleChange}
              variant="outlined"
              size="medium"
              error={isErrors.passwordConfirmation}
              helperText={errorsMessages.passwordConfirmation}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={showPassworConfirmationdHandler}
                      onMouseDown={passwordConfirmationMouseDownHandler}
                      edge="end"
                      sx={{ color: '#7E66DC' }}
                    >
                      {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: primaryPurple
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: primaryPurple
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: primaryPurple
                }
              }}
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleRegister}
                disabled={!canRegister}
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
                Register
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
              Already have an account?{' '}
              <Button
                onClick={gotoLoginPage}
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
                Login
              </Button>
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}