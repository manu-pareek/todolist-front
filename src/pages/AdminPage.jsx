import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";
const columns = [
  { field: "_id", headerName: "ID", width: 220 },
  { field: "name", headerName: "Name", width: 220 },
  { field: "email", headerName: "Email", width: 220 },
  {
    field: "mob_no",
    headerName: "Mob no",
    type: "number",
    width: 220,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let temp = users;
    axios
      .get("http://localhost:9000/get")
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .then((res) => {
        for (let i = 0; i < users.length; i++) temp[i].id = i;
      })
      .then((res) => setUsers(temp));
  }, []);
  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <a href="/">
        {" "}
        <Button variant="outlined" onClick={() => logoutFunc()}>
          Logout
        </Button>
      </a>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
