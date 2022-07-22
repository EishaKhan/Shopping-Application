import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Container,
    Grid,
    Paper,
    Card,
    CardMedia,
    IconButton,
    TableCell,
    TableRow,
    Table,
    TableContainer,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from 'axios';
import CloseIcon from "@material-ui/icons/Close";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from "react-share";


const useStyles = makeStyles((theme) => ({
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
    button: {
        float: "right",
        textTransform: 'capitalize',
        color: "#ffffff",
        backgroundColor: '#4CAF50',
        '&:hover': {
            backgroundImage: "linear-gradient(90deg, rgb(31, 112, 193), rgb(0, 0, 0))",
        }
    },
    closeButton: {
        outline: 'none',
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

}));

export default function DetailPage(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    function handleClickOpen() {
        axios.get(` https://fakestoreapi.com/products/${props.id}`).then((res) => {
            setData(res.data);
            console.log("MovieData", res.data);
        })
            .catch();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" className={classes.button} onClick={handleClickOpen}>
                <VisibilityIcon />View
            </Button>
            {/* modal */}
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="customized-dialog-title" >
                    Description
                    <Tooltip title="Close" arrow>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose} >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent dividers>
                    <Container >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Card className={classes.root1}>
                                    <CardMedia
                                        className={classes.media1}
                                        component="img"
                                        alt="img"
                                        image={data.image}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <TableContainer variant={Paper}>
                                    <Table size="small" className={classes.table}>
                                        <TableRow>
                                            <TableCell variant="head"   >Title</TableCell>
                                            <TableCell colSpan={2} >{data.title}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Category</TableCell>
                                            <TableCell>{data.category}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Price</TableCell>
                                            <TableCell>{data.price}</TableCell>
                                        </TableRow>
                                        {(() => {
                                            let value = []
                                            value = data.rating || []
                                            return (
                                                <TableRow>
                                                    <TableCell variant="head">Rating</TableCell>
                                                    <TableCell>{value.rate}</TableCell>
                                                </TableRow>
                                            )
                                        })()}
                                        <TableRow>
                                            <TableCell variant="head">Description</TableCell>
                                            <TableCell>{data.description}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Share</TableCell>
                                            <TableCell>
                                                <WhatsappShareButton
                                                    title={data.title}
                                                    url={data.image}
                                                    description={data.description}>
                                                    <WhatsappIcon round={true} size={32}></WhatsappIcon>
                                                </WhatsappShareButton>&nbsp;&nbsp;
                                                <FacebookShareButton
                                                    title={data.title}
                                                    //description={data.description}
                                                    quote={data.description}
                                                    url={data.image}
                                                    hashtag="Cubedots Online Shopping">
                                                    <FacebookIcon round={true} size={32}></FacebookIcon>
                                                </FacebookShareButton>&nbsp;&nbsp;
                                                <TwitterShareButton
                                                    title={data.title}
                                                    url={data.image}>
                                                    <TwitterIcon round={true} size={32}></TwitterIcon>
                                                </TwitterShareButton>&nbsp;&nbsp;
                                                <LinkedinShareButton
                                                    title={data.title}
                                                    url={data.image}>
                                                    <LinkedinIcon round={true} size={32}></LinkedinIcon>
                                                </LinkedinShareButton>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.btn} variant="contained">
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
