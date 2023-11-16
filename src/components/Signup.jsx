import {
  TextField,
  Button,
  Box,
  Card,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";

function Signup({setUserEmail}) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("users");
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const handleCheckbox1 = () => {
    setIsChecked1(!isChecked1);
    isChecked2 ? setIsChecked2(false) : setIsChecked2(true);
    setRole("");
    setRole("users");
  };
  const handleCheckbox2 = () => {
    setIsChecked2(!isChecked2);
    isChecked1 ? setIsChecked1(false) : setIsChecked1(true);
    setRole("");
    setRole("admin");
  };

  const handleSignup = async() => {
    
    const response = await axios.post(`${BASE_URL}/${role}/signup`, {
      username,
      password
    })
    navigate("/signin");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 15,
          paddingTop: 150,
        }}
      >
        <Typography variant="h6">Welcome to 100xDevs. Sign Up below</Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: 400,
            padding: 20,
            height: 250,
          }}
        >
          <TextField
            fullWidth={true}
            label="Email"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={isChecked1} onChange={handleCheckbox1} />
                }
                label="User"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={isChecked2} onChange={handleCheckbox2} />
                }
                label="Admin"
              />
            </div>
          </FormGroup>
          <br />
          <br />
          <Box textAlign="center">
            <Button size="large" style={{width:"100%"}} variant="contained" onClick={handleSignup}>
              Sign Up
            </Button>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
