import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";

function UserCourses() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/purchasedCourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCourses(res.data.purchasedCourses);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 15,
      }}
    >
      {courses.length == 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <Typography variant="h6"> No Courses purchased!!</Typography>
          </div>
        </>
      ) : (
        <>
          {courses.map((course) => {
            return <DisplayCourses course={course} />;
          })}
        </>
      )}
    </div>
  );
}

function DisplayCourses({ course }) {
  return (
    <Card
      style={{
        padding: 40,
        borderRadius: 10,
        width: 300,
        minHeight: 200,
        margin: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Typography variant="h4">{course.title}</Typography>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {course.description}
        </Typography>
        <Typography variant="h6">BDT {course.price}</Typography>
      </div>
      <img
        src={course.imageLink}
        style={{ width: 300, height: 250, objectFit: "cover" }}
      />
    </Card>
  );
}

export default UserCourses;
