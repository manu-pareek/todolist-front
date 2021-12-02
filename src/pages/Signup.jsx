import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [mob, setMob] = useState("");
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [login, setLogin] = useState(false);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const submitForm = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      type: type,
      mob_no: mob,
    };
    axios
      .post("http://localhost:9000/api/v1/signup", data)
      .then((res) => alert(res.data.message))
      .catch((error) => alert(error.response.data.message));
  };
  const loginForm = () => {
    const logindata = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:9000/api/v1/signin", logindata)

      .then((res) => {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
      })
      .then((res) => window.location.reload())
      .catch((error) => alert(error.response.data.message));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <>
        <Typography
          style={{
            fontSize: "6vw",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Organize Work and Life.{" "}
        </Typography>

        <Grid container>
          <Grid xs={6}>
            <img src="./todo-list.svg" />
          </Grid>
          {!login ? (
            <>
              {" "}
              <Grid xs={6}>
                <div style={{ padding: "2%", width: "100%" }}>
                  Email <TextField onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div style={{ padding: "2%" }}>
                  Password{" "}
                  <TextField onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div style={{ padding: "2%" }}>
                  Name{" "}
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "10vw" }}
                  />
                  Mob no{" "}
                  <TextField
                    onChange={(e) => setMob(e.target.value)}
                    style={{ width: "10vw" }}
                  />
                </div>
                <div style={{ padding: "2%" }}>
                  DOB{" "}
                  <input
                    type="date"
                    onChange={(e) => setDob(e.target.value.split("T")[0])}
                  />
                  {/* </div>
                <div style={{ padding: "2%" }}> */}
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ display: "inline-block" }}
                  >
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Age"
                    onChange={handleChange}
                    style={{ width: "20%" }}
                  >
                    <MenuItem value={"Student"}>Student</MenuItem>
                    <MenuItem value={"Professional"}>Professional</MenuItem>
                    <MenuItem value={"Household"}>Household</MenuItem>
                  </Select>
                </div>
                <Button variant="contained" onClick={() => submitForm()}>
                  Submit
                </Button>{" "}
                <Button variant="contained" onClick={() => setLogin(true)}>
                  Login
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid xs={6}>
                <div style={{ padding: "2%" }}>
                  Email <TextField onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div style={{ padding: "2%" }}>
                  Password{" "}
                  <TextField onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* <Link to="/"> */}
                <Button variant="contained" onClick={() => loginForm()}>
                  Submit
                </Button>{" "}
                {/* </Link> */}
                <Button variant="contained" onClick={() => setLogin(!login)}>
                  {login ? <>Signup</> : <>Login</>}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </>
    </div>
  );
};

export default Signup;
