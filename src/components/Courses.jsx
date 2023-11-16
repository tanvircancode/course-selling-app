import { useState, useEffect } from "react";
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const adminCourses = () => {
      fetch("http://localhost:3000/admin/courses/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(callback1);
      function callback1(res) {
        res.json().then(callback2);
      }

      function callback2(data) {
        setCourses(data.courses);
        console.log(data.courses);
      }
    };

    const userCourses = () => {
      fetch("http://localhost:3000/users/courses/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(callback1);
      function callback1(res) {
        res.json().then(callback2);
      }

      function callback2(data) {
        setCourses(data.courses);
        console.log(data.courses);
      }
    };
    role == "admin" ? adminCourses() : userCourses();
  }, []);

  if (!courses.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );

  function Course({ course }) {
    return (
      <Card
        variant="outlined"
        style={{
          width: 300,
          padding: 40,
          minHeight: 200,
          margin: 10,
        }}
      >
        <Typography textAlign="center" variant="h4">
          {course.title}
        </Typography>
        <Typography textAlign="center" variant="h6">
          {course.description}
        </Typography>
        <Typography textAlign={"center"} variant="h6">
          {course.price}
        </Typography>
        <img
          src={course.imageLink}
          style={{ width: 300, height: 250, objectFit: "cover" }}
        />
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          {role == "admin" ? (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/course/" + course._id);
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                navigate("/purchasecourse/" + course._id);
              }}
            >
              Buy
            </Button>
          )}
        </div>
      </Card>
    );
  }
}

export default Courses;
