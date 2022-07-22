import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import DetailPage from "./DetailPage";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from 'axios';
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
  background: {
    height: 270,
    backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
    color: "#ffffff",
  },
  button: {
    float: "right",
    textTransform: 'capitalize',
    color: "#ffffff",
    backgroundColor: '#4CAF50',
    '&:hover': {
      backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
    }
  },
  btn: {
    color: "#ffffff",
    margin: theme.spacing(0.2),
    marginLeft: 1,
    textTransform: 'capitalize',
    backgroundColor: '#F14141',
    '&:hover': {
      backgroundColor: '#F14141',
    }
  },
  closeButton: {
    outline: 'none',
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 8,
    cursor: 'pointer',
    borderColor: "#e6e6e6",
    boxShadow: '0 10px 30px 0px rgb(0 0 0 / 10%)',
    "&:hover": {
      transform: "scale(1.07)",
      transition: 'all 0.4s'
    },
  },
  media: {
    backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
    height: 150,
    width: "100%",
  },
  cardcontent: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: '16px',
    color: '#2c4887',
    fontWeight: 'bold',
    lineHeight: '20px',
    textTransform: 'capitalize',
  },
  cardcontent1: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    float: 'right',
    fontSize: '16px',
    color: '#2c4887',
    fontWeight: 400,
    lineHeight: '20px',
  },
  hero: {
    display: "block",
    padding: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
    margin: "auto",
  },
  text: {
    color: "#ffffff !important",
  },
  formControl: {
    backgroundColor: 'white',
  }

}));

export default function Main() {
  const classes = useStyles();
  const [count, setCount] = useState(false);
  const [postedData, setPostedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`).then((response) => {
      setPostedData(response.data);
      setCount(response.data.length)
      console.log("Data", response.data);
    })
  }, []);

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <Grid item xs={12} sm={6} md={3}>
              <div>
                <Skeleton variant="text" width={210} />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
              </div>
            </Grid>
          ))}
      </>
    );
  };

  const sortedDetail = useMemo(() => {
    const searchRegex = searchTerm && new RegExp(`${searchTerm}`, "gi");
    return postedData.filter(
      (item) =>
      (!searchRegex ||
        searchRegex.test(item.title))
    );
  }, [postedData, searchTerm]);



  return (
    <div>
      <Box
        components={Paper}
        p={4}
        className={classes.background}
        elevation={0}
        square
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" className={classes.text} />
          }
          aria-label="breadcrumb"
        >
          <Typography href="/" variant={"p"} className={classes.text}>
            Dashboard
          </Typography>
          <Typography variant={"p"} className={classes.text}>
            {" "}
            Popular Deals
          </Typography>
        </Breadcrumbs>
        <div className={classes.hero}>
          <Typography variant={"h5"} className={classes.text} align="center">
            {" "}
            Cubedots Shopping
          </Typography>
          <br />
          <Typography variant={"body1"} align="center" className={classes.text}>
            Top brands for Phones and Electronics. Latest trends in Fashion.
          </Typography>
          <Typography variant={"subtitle2"} align="center" color="secondary">
            No of items : {count}
          </Typography>
          <Box className={classes.formControl}>
            <TextField
              id="outlined-basic"
              label="Search your product"
              variant="outlined"
              margin="dense"
              fullWidth
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>
      </Box>
      <br />

      <Container>
        <div className={classes.section}>
          <Box className={classes.root} style={{ display: "flex" }}>
            <Grid container item spacing={3} alignItems="stretch" >
              {sortedDetail && sortedDetail.length > 0 ? (
                sortedDetail.map((item) => {
                  return (
                    <Grid item xs={12} sm={6} md={3}>
                      <Card className={classes.card} variant="outlined">
                        <CardMedia
                          component="img"
                          alt="img"
                          image={item.image}
                          className={classes.media}
                        />
                        <Typography variant="h1" component="h1" className={classes.cardcontent}>
                          {item.title}
                        </Typography>
                        <Typography variant="subtitle2" component="p" className={classes.cardcontent1}>
                          Price: {item.price}
                        </Typography>
                        <br />
                        <CardActions>
                          <DetailPage id={item.id} />
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <>
                  <ListSkeleton listsToRender={8} />
                </>
              )}
            </Grid>
          </Box>
        </div>
      </Container>
      <br />
      <Footer />
    </div>
  );
}
