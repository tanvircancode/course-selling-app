import { Container, Typography, Box, Button, Stack, Grid } from "@mui/material";
import Airbnb from "../assets/airbnb.png";
import Amazon from "../assets/amazon.png";
import Cm from "../assets/creativeMarket.png";
import Google from "../assets/google.png";
import Shopify from "../assets/shopify.png";
import Hero from "../assets/Hero.jpg";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        background: '#EEEEEE',
    },
});


function Home() {
    const classes = useStyles();

    return (
        <div>
            <Container style={{ display: 'flex', justifyContent: 'center', gap: '15em', marginTop: 100 }}>
                <Box width="50vw" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 30 }}>
                    <div >
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', letterSpacing: '-1.5px', marginBottom: 5 }}>
                            Gain expertise in your chosen field,
                        </Typography>
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', letterSpacing: '-1.5px', marginBottom: 5 }}>
                            explore new horizons, and accelerate
                        </Typography>
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', letterSpacing: '-1.5px', marginBottom: 5, color: '#3084E2' }}>
                            your career growth
                        </Typography>
                    </div>

                    <Typography variant="caption" gutterBottom style={{ fontWeight: 'bold', color: '#727477' }}>
                        With CourseHere, you have the key to success right at your
                        fingertips. Embark on a transformative learning experience designed
                        to inspire, empower, and guide you towards greatness. Join a global
                        community of learners, connect with industry experts, and ignite
                        your passion for continuous learning. Whether you're a student,
                        professional, or lifelong learner, CourseHere offers a diverse range
                        of courses tailored to your unique goals and aspirations.
                    </Typography>
                    <Stack spacing={2} direction="row" >
                        <Button variant="contained" style={{ fontWeight: 'bold' }}>Get Started</Button>
                        <Button variant="outlined" style={{ fontWeight: 'bold' }} >Learning</Button>
                    </Stack>
                </Box>

                <div style={{ marginTop: -20 }}>
                    <img src={Hero} alt="Hero image" height="400px" width="250px" />
                </div>

            </Container>

            <Container style={{ width: 300, minHeight: 200, marginTop: 50 }}>

                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <img src={Airbnb} alt="Airbnb_image" style={{ width: 150 }} />
                    </Grid>

                    <Grid item >
                        <img src={Amazon} alt="Airbnb_image" style={{ width: 150 }} />

                    </Grid>
                    <Grid item>
                        <img src={Google} alt="Airbnb_image" style={{ width: 100, }} />

                    </Grid>

                    <Grid item>
                        <img src={Shopify} alt="Airbnb_image" style={{ width: 150 }} />

                    </Grid>
                    <Grid item>
                        <img src={Cm} alt="Airbnb_image" style={{ width: 150 }} />

                    </Grid>
                </Grid>

            </Container>
        </div>
    );
}

export default Home;