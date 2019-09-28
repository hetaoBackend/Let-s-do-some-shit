import React, { Component } from 'react';
import {Modal, Fade, Menu, MenuItem, Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import Graph from "./charts/Graph";
import { getCookie } from './CookieFunctions';
import { Planet } from 'react-kawaii';
import Backdrop from '@material-ui/core/Backdrop';

import ChangeComponent from "./ChangeComponent"


export default class Register extends Component {
    constructor() {
        super();

        this.state = {
          anchor : null,
          open : false,
        };
    }
    componentWillMount () {
        console.log(getCookie("token"))
        if (getCookie("token") === null)
        window.location.href = "./";
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value }); 
    }
    
    onSubmit = e => {
        this.setState({ ["open"]: true }); 
        // send the state to the server
    }
    
    handleClick = (event) => {
        this.setState({["anchor"] : event.currentTarget});
    };
    
    handleClose = () => {
        this.setState({["anchor"] : null});
    };
    logout = () => {
        window.location.href = "./logout";
    }
    
    changeProfile = () => {
        this.setState({["anchor"] : null});
        this.setState({["open"]: true});
    }
    render() {

        return (

            <div style={{ marginLeft:"5vw", marginTop:"5vh", height: "30vh", display: "flex", flexDirection: "row" }}>
                <Card style={{top:"100px", height:"90vh", backgroundColor: "#f6edfc", padding: "1rem", width: "90vw" }}>
                    <CardContent style={{height:"20%"}}>
                       <Graph />
                    </CardContent>
                </Card>
                <div aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{position:"fixed", zindex:"1", right:"50px", bottom:"30px"}}>
                <Planet size={100} mood={"happy"} color="#FDA7DC" />
                
                </div>
                <Menu
                    id="simple-menu"
                    style={{position:"fixed",zindex:"2", right:"60px", bottom:"30px" }}
                    anchorEl={this.state.anchor}
                    keepMounted
                    open={Boolean(this.state.anchor)}
                    onClose={this.state.handleClose}
                >
                    <MenuItem onClick={this.changeProfile}>Change Profile</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                    <MenuItem onClick={this.handleClose}>Close Menu</MenuItem>
                </Menu>
                <Modal
        style={{
          postion:"fixed",
          top:"20vh",
          left: "20vw"
        }}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
      >
                <Fade in={this.state.open}>
                    <div>
                    <ChangeComponent/>
                    </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}


