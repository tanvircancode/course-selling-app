import { TextField, Button, Box, Card, Typography } from "@mui/material";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);



  const handleAddCourse = () => {
    function callback1(res) {
      res.json().then(callback2);
    }
    function callback2(data) {
      alert("Course added!!")
    }

    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        imageLink: image,
        published: true,
        price
      }),
      headers: {
        'Content-Type': 'application/json',
         "Authorization" : "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  };

  return (
    <div>
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
            height: 350,
            marginTop: 50
          }}
        >
          <TextField
            fullWidth={true}
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Image Link"
            variant="outlined"
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Price"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <Box textAlign="center">
            <Button size="large" variant="contained" onClick={handleAddCourse}>
              Add Course
            </Button>
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
