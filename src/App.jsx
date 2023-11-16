import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import Signin from "./components/Signin";
import Home from "./components/Home";
import UserCourses from "./components/UserCourses";
import AddCourse from "./components/AddCourse.jsx";
import PurchaseCourse from "./components/PurchaseCourse.jsx";
import Course from "./components/Course";
import { useEffect, useState } from "react";
import { BASE_URL } from "./config.js";
import { userState } from "./store/atoms/user";
import axios from "axios";
import { RecoilRoot , useSetRecoilState} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#FFFFFF" }}
      >
        <Appbar />
        <InitUser />
        <Routes>
          <Route path={"/"} element={< Home />} /> 
          <Route path={"/addcourse"} element={<AddCourse />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/purchasecourse/:courseId" element={<PurchaseCourse />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/usercourses" element={<UserCourses />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const role = localStorage.getItem("role");

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${role}/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
