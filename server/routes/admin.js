

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {User, Admin, Course} = require("../db");
const {secretKeyAdmin, authenticateJwtAdmin} = require("../middleware/auth")


const router = express.Router();

const generateJwtAdmin = (user) => {
    const payload = {
      username: user.username,
      role: user.role,
    };
    
    return jwt.sign(payload, secretKeyAdmin, { expiresIn: "1h" });
  };

// Admin routes
router.post("/signup", async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
  
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const token = generateJwtAdmin({ username, role: "admin" });
      res.json({ message: "Admin created successfully", token });
    }
  });
  
  router.get("/me", authenticateJwtAdmin,  async(req, res) => {
    const username = req.user.username;
    const admin = await Admin.findOne({username});
    if(admin) {
        return res.json({
            username : admin.username
          })
    }else {
        res.status(403).json({message: 'Admin does not exist'});
    }
   
  });
  
  router.post("/login", async (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
  
    if (admin) {
      const token = generateJwtAdmin({ username, role: "admin" });
      res.json({ message: "Logged in successfully", token, role: 'admin' });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  });
  
  router.post("/courses", authenticateJwtAdmin, async (req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
  });
  
  router.put("/courses/:courseId", authenticateJwtAdmin, async (req, res) => {
    // logic to edit a course
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
    });
  
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(405).json({ message: "Course not found" });
    }
  });
  
  router.get("/courses", authenticateJwtAdmin, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({});
    res.json({ courses });
  });

  router.get("/course/:courseId", authenticateJwtAdmin, async(req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId)
    res.json({course});
  })

  module.exports = router