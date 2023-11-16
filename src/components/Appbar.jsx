import { Button, Typography, AppBar, Box, Toolbar, Stack } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { userState } from "../store/atoms/user";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Appbar() {
  
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  const role = localStorage.getItem("role");

  if (userLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: "transparent", boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{ color: '#1976d2', fontWeight: 'bold' }}>
            100xdevs
          </Typography>
          {userEmail ? (
            <>
              {role == "admin" ? (
                <div style={{ marginRight: 15 }}>
                  <Button
                    color="inherit"
                    style={{ fontWeight: 600 }}
                    onClick={() => {
                      navigate("/addcourse");
                    }}
                  >
                    Add Course
                  </Button>
                </div>
              ) : (
                <div style={{ marginRight: 15 }}>
                  <Button
                    color="inherit"
                    style={{ fontWeight: 600 }}
                    onClick={() => {
                      navigate("/usercourses");
                    }}
                  >
                    Purchased Course
                  </Button>
                </div>
              )}

              <div style={{ marginRight: 15 }}>
                <Button
                  color="inherit"
                  style={{ fontWeight: 600 }}
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  Courses
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    localStorage.setItem("role", null);
                    setUser({
                      isLoading: false,
                      userEmail: null,
                    });

                    navigate("/signin");
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Stack spacing={2} direction="row">

                <ShoppingCartIcon style={{marginTop: 5,color: 'grey'}}  />


                <div>
                  <Button
                    variant="outlined"
                    style={{ fontWeight: 'bold' }}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Login
                  </Button>
                </div>
                <div style={{ marginRight: 10, fontWeight: 'bold' }}>
                  <Button

                    variant="contained"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    SIGNUP FOR FREE
                  </Button>
                </div>
              </Stack>


            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Appbar;
