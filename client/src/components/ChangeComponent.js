import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import axios from "axios";
import {setCookie, getCookie, eraseCookie} from "./CookieFunctions.js";




export default class ChangeComponent extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errors: {},
            preferedName: "",
            technicalSkill: 0,
            projectEngagement: 0,
            communicationSkill: 0,
            innovationProcentage: 0,
            adaptability: 0,

        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value }); 
    }
    
    onSubmit = e => {
        console.log(this.state);
        axios({
            method: 'POST',
            responseType:'application/json',
            url: "http://127.0.0.1:5000/profile/change",
            data: {
                    email : getCookie("username"),
                    technicalSkill: this.state.technicalSkill,
                    projectEngagement: this.state.projectEngagement,
                    communicationSkill: this.state.communicationSkill,
                    innovationProcentage: this.state.innovationProcentage,
                    adaptability: this.state.adaptability,

            },
          }).then((e) => {
            //   console.log(e.data);
              window.location.href = "./dashboard";
            //   setCookie("token", e.data.token, 10);
          }
          ).catch(function (error) {
            console.log(error);
          });
          console.log("we have made some improvement")

    }

    render() {

        return (
            <div style={{ marginLeft:"5vw", marginTop:"5vh", height: "30vh", display: "flex", flexDirection: "row" }}>
                <Card style={{height:"60vh", backgroundColor: "rgb(58, 65, 73)", padding: "1rem", width: "60vw" }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{ color: "white" }} gutterBottom>Change Preferences</Typography>
                        <div style={{display:"flex", flexDirection:"column"}}> 
                        

                        <Slider
                            defaultValue={5}
                            getAriaValueText={(e) => e}
                            aria-labelledby="discrete-slider"
                            min={0}
                            max={100}
                            onChangeCommitted = {(e, val) => this.setState({ ["technicalSkill"]: val }) }
                            valueLabelDisplay="auto"
                            style={{marginTop:"1.5rem"}}
                          />
                        <Typography variant="subtitle1" component="h2" style={{ marginTop:"0rem",color: "gray" }} gutterBottom>Technical skills</Typography>
                        <Slider
                            defaultValue={5}
                            getAriaValueText={(e) => e}
                            aria-labelledby="discrete-slider"
                            onChangeCommitted = {(e, val) => this.setState({ ["projectEngagement"]: val }) }
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            style={{marginTop:"0rem"}}
                          />
                        <Typography variant="subtitle1" component="h2" style={{ marginTop:"0rem",color: "gray" }} gutterBottom>Project Engagement</Typography>
                        <Slider
                            defaultValue={5}
                            getAriaValueText={(e) => e}
                            onChangeCommitted = {(e, val) => this.setState({ ["communicationSkill"]: val }) }
                            aria-labelledby="discrete-slider"
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            style={{marginTop:"0rem"}}
                          />
                        <Typography variant="subtitle1" component="h2" style={{ marginTop:"0rem",color: "gray" }} gutterBottom>Communication Skills</Typography>
                        <Slider
                            defaultValue={5}
                            getAriaValueText={(e) => e}
                            aria-labelledby="discrete-slider"
                            min={0}
                            onChangeCommitted = {(e, val) => this.setState({ ["innovationProcentage"]: val }) }
                            max={100}
                            valueLabelDisplay="auto"
                            style={{marginTop:"0rem"}}
                          />
                        <Typography variant="subtitle1" component="h2" style={{ marginTop:"0rem",color: "gray" }} gutterBottom>Innovation Procentage</Typography>
                        <Slider
                            defaultValue={5}
                            getAriaValueText={(e) => e}
                            aria-labelledby="discrete-slider"
                            min={0}
                            max={100}
                            onChangeCommitted = {(e, val) => this.setState({ ["adaptability"]: val }) }
                            valueLabelDisplay="auto"
                            style={{marginTop:"0rem"}}
                          />
                        <Typography variant="subtitle1" component="h2" style={{ marginTop:"0rem",color: "gray" }} gutterBottom>Adaptability</Typography>
                     
                        </div>
                      
                        <Button type="submit" onClick={this.onSubmit} style={{ position:"fixed", left:"18vw", top:"70vh", backgroundColor: "#5C20D8", marginLeft:"70rem", marginTop:"5em" }}>Submit</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}


