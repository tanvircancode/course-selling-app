
const express = require("express");
const jwt = require("jsonwebtoken");

const {User, Admin, Course} = require("../db");
const {secretKeyUsers, authenticateJwtUsers} = require("../middleware/auth");

const router = express.Router();


const generateJwtUsers = ({username, role}) => {
    const payload = {
      username,
      role
    };
    return jwt.sign(payload, secretKeyUsers, { expiresIn: "1h" });
  };

// User routes
router.post("/signup", async (req, res) => {
    // logic to sign up user
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (user) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = generateJwtUsers({ username, role: "user" });
      res.json({ message: "User created successfully", token });
    }
  });

  router.get("/me", authenticateJwtUsers, async (req, res) => {
    //fetching user credentials
    const username = req.user.username;

    const user = await User.findOne({username});
    if(user) {
      res.json({username : user.username})
    }else {
      res.status(403).json({message : 'User not found'})
    }
  })
  
  router.post("/login", async (req, res) => {
    // logic to log in user
    const { username, password } = req.headers;
  
    const user = await User.findOne({ username, password });
  
    if (user) {
      const token = generateJwtUsers({ username, role: "user" });
      res.json({ message: "Logged in successfully", token, role: 'users', user  });
    } else {
      res.status(403).json({ message: "User authentication failed" });
    }
  });
  
  router.get("/courses", authenticateJwtUsers, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published: true });
    res.json({ courses });
  });
  
  router.post("/courses/:courseId", authenticateJwtUsers, async (req, res) => {  
    // logic to purchase a course
    const course = await Course.findById(req.params.courseId);
  
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        
        // const hasCourse = await user.purchasedCourses.find(id => id == req.params.courseId);
        // if(hasCourse) {
        //   res.status(403).json({ message: "Course already purchased" });
        //   return;
        // }
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found or not available" });
    }
  }); 

  router.get("/haspurchased/:courseId", authenticateJwtUsers, async( req, res) => {
    // logic to check if course is already purchased or not
    const user = await User.findOne({ username: req.user.username });
   
    const hasCourse = await user.purchasedCourses.find((id) => id == req.params.courseId);

    if(hasCourse) {
      res.status(204).json({ message: "Course already purchased" });
         
    }else {
      res.status(200).json({ message: "Course has not purchased" });
    }
  })

  //new
  router.get("/course/:courseId",authenticateJwtUsers, async( req, res) => {
    // logic to fetch single course
    const course = await Course.findById(req.params.courseId);
    if(course) {
      
      res.json({course});
    }else {
       res.status(404).json({'message' : 'course not found'})
    }
  } )

 
  
  router.get("/purchasedCourses", authenticateJwtUsers, async (req, res) => {
    // logic to view purchased courses
  
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
  
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  });

  module.exports = router