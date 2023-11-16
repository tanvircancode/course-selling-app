import {
  Box,
  Button,
  Card,
  Typography,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { courseState } from "../store/atoms/course";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  isCourseLoading,
  courseTitle,
  courseImage,
  coursePrice,
} from "../store/selectors/course";
import { purchaseState } from "../store/atoms/purchase";

function Course() {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  const setHasPurchased = useSetRecoilState(purchaseState)

//   const [hasPurchased, setHasPurchased] = useState(false);

  const getCourse = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/haspurchased/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.status)
      if (response.status == 200) {
        setHasPurchased({isPurchase : true});
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({ isLoading: false, course: res.data.course });
      })
      .catch((e) => {
        setCourse({ isLoading: false, course: null });
      });
    getCourse();
  }, []);

  if (courseLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div>
      <GrayTopper />

      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <PurchaseCard
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);

  return (
    <div
      style={{
        background: "#212121",
        height: 250,
        width: "100vw",
        top: 0,
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" style={{ fontWeight: 600, color: "white" }}>
          {title}
        </Typography>
      </div>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const price = useRecoilValue(coursePrice);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        style={{
          width: 300,
          paddingBottom: 20,
          height: 250,
          borderRadius: 20,
          marginTop: 100,
          zIndex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 300, height: 170 }} />
        <div style={{ marginLeft: 15 }}>
          <Typography style={{ fontWeight: 600 }} variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2">Price</Typography>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            Tk {price}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function PurchaseCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [hasPurchased, setHasPurchased] = useRecoilState(purchaseState);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setTitle(courseDetails.course.title);
    setDescription(courseDetails.course.description);
    setPrice(courseDetails.course.price);
    setImage(courseDetails.course.imageLink);
  }, [courseDetails]);

  const handlePurchaseCourse = () => {
    axios
      .post(`${BASE_URL}/users/courses/` + courseDetails.course._id, {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => setHasPurchased({isPurchase : false}))
      .catch((e) => console.error(e));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
          marginTop: 200,
        }}
      >
        <Typography variant="h5">Purchase Course </Typography>

        <br />
        <br />
        <TextField
          value={title}
          fullWidth={true}
          label="Title"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={description}
          fullWidth={true}
          label="Description"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={image}
          fullWidth={true}
          label="Image Link"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={price}
          fullWidth={true}
          label="Price"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <br />
        <Box textAlign="center">
          <Button
            size="large"
            variant="contained"
            disabled={!hasPurchased.isPurchase}
            style={{ width: "100%" }}
            onClick={handlePurchaseCourse}
          >
            {hasPurchased.isPurchase ? "purchase Course" : "Course Already Purchased!"}
          </Button>
        </Box>

      </Card>
    </div>
  );
}

export default Course;
