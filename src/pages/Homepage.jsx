import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const token_data = jsonwebtoken.verify(
      localStorage.getItem("token"),
      "hashkey"
    );
    localStorage.getItem("count")
      ? setCount(localStorage.getItem("count"))
      : localStorage.setItem("count", 0);

    const todos_token = token_data.token.todo;
    setTodos(todos_token);

    // axios
    // .get("http://localhost:9000/api/v1/getTodos",
  }, []);
  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };
  const addTodo = (todo) => {
    const curr_todo = {
      id: count,
      text: todo,
      isChecked: false,
    };

    localStorage.setItem("count", parseInt(localStorage.getItem("count")) + 1);
    axios
      .post("http://localhost:9000/api/v1/addTodo", {
        list: [curr_todo, ...todos],
        token: localStorage.getItem("token"),
      })

      .then((res) => localStorage.setItem("token", res.data.token))
      .then((res) => alert("Please wait while we add your Todo"))
      .then((res) => setTodos([curr_todo, ...todos]))
      .then((res) => window.location.reload());
  };
  console.log(todos);
  const checkBoxCheck = (id) => {
    let list = todos;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) list[i].isChecked = !list[i].isChecked;
    }
  };
  //   const isCheckedFunc = (id) => {
  //     for (let i = 0; i < todos.length; i++) {
  //       if (todos[i].id === id && todos[i].isChecked === true) return true;
  //     }
  //     return false;
  //   };
  const ListItem = (ele) => {
    return (
      <div key={ele.id} style={{ width: "95%", marginTop: "2%" }}>
        <Grid container>
          <Grid xs={3}>
            <Checkbox
              onClick={() => checkBoxCheck(ele.id)}
              //   checked={() => isCheckedFunc(ele.id)}
            />
          </Grid>
          <Grid xs={6}>
            <Typography>{ele.text}</Typography>
          </Grid>
          <Grid xs={3}>
            <Button variant="outlined" onClick={() => deleteTodo(ele.id)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
  const deleteTodo = (id) => {
    let list = todos;
    let updated_list = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id !== id) updated_list.push(list[i]);
    }
    axios
      .post("http://localhost:9000/api/v1/addTodo", {
        list: updated_list,
        token: localStorage.getItem("token"),
      })
      .then((res) => localStorage.setItem("token", res.data.token))
      .then((res) => alert("Please wait while we delete your Todo"))
      .then((res) => setTodos(updated_list));
  };
  const deleteChecked = () => {
    let list = todos;
    let updated_list = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].isChecked === false) updated_list.push(list[i]);
    }
    axios
      .post("http://localhost:9000/api/v1/addTodo", {
        list: updated_list,
        token: localStorage.getItem("token"),
      })
      .then((res) => localStorage.setItem("token", res.data.token))
      .then((res) => alert("Please wait while we delete your Todo"))
      .then((res) => setTodos(updated_list));
  };
  return (
    <div
      style={{
        backgroundImage:
          "url(https://miro.medium.com/max/1000/1*ZhuqSg8Jmz4p8H6X5U1uzQ.png)",

        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => logoutFunc()}
        style={{ marginLeft: "80%", marginTop: "4%" }}
      >
        Logout
      </Button>
      <Grid container>
        <Grid xs={6}>
          <img
            style={{ height: "60vh", padding: "15%" }}
            src="https://ouch-cdn2.icons8.com/UcSonXXKCDM5CzdyZQOxkc0jq864zGMjP_F1yMxppoQ/rs:fit:824:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODk5/L2U2NDcwYWQxLTZm/ODAtNDI5Ni1hMDAz/LTlkMjUxYTAzODNi/MS5zdmc.png"
          />
        </Grid>
        <Grid xs={6} style={{ textAlign: "center" }}>
          <div style={{ marginTop: "20%", marginBottom: "auto" }}>
            <Grid container>
              <Grid xs={6}>
                <TextField
                  onChange={(e) => setTodo(e.target.value)}
                  style={{ marginLeft: "0%" }}
                />
                <Button
                  variant="contained"
                  onClick={() => addTodo(todo)}
                  style={{ backgroundColor: "black", height: "90%" }}
                >
                  Add{" "}
                </Button>
              </Grid>
              <Grid
                xs={6}
                style={{
                  textAlign: "left",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => deleteChecked()}
                  style={{
                    marginLeft: "40%",
                    // height: "100%",
                    width: "30%",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Delete Checked
                </Button>
              </Grid>
            </Grid>
          </div>
          {todos.map((ele) => ListItem(ele))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
