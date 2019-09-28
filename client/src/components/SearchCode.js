import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import axios from "axios";
import {setCookie, getCookie, eraseCookie} from "./CookieFunctions.js";




export default class SearchCode extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            data: null,

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
            url: "http://10.0.50.126:5000/register",
            data: {
                    email : this.state.email,
                    password: this.state.password,
                    preferedName: this.state.preferedName,
                    technicalSkill: this.state.technicalSkill,
                    projectEngagement: this.state.projectEngagement,
                    communicationSkill: this.state.communicationSkill,
                    innovationProcentage: this.state.innovationProcentage,
                    adaptability: this.state.adaptability,

            },
          }).then((e) => {
            //   console.log(e.data);
              window.location.href = "./";
            //   setCookie("token", e.data.token, 10);
          }
          ).catch(function (error) {
            console.log(error);
          });
          console.log("we have made some improvement")
        // 

        // send the state to the server
        // ################################
        // ################################
        // ################################
        // ################################
        // ################################
    }
    func(e) {
        http://10.0.50.126:5000/search?query=connect to mongodb

        // console.log(this.state);
        console.log(this.state.email);
        axios({
            method: 'POST',
            responseType:'application/json',
            url: "http://10.0.50.126:5000/search",
            data: {
                    query: this.state.email
            },
          }).then((ee) => {
            //   console.log(e.data);
              this.state.data = ee;
            //   setCookie("token", e.data.token, 10);
          }
          ).catch(function (error) {
            console.log(error);
          });
    }
    render() {

        return (
            <div style={{width:"100%", marginLeft:"5vw", marginTop:"5vh", height: "30vh", display: "flex", flexDirection: "row" }}>
                        <Typography variant="h5" component="h2" style={{ color: "black" }} gutterBottom>Preferences</Typography>
                        <div style={{display:"flex", flexDirection:"column"}}> 
                        <Input onChange={this.onChange} style={{postion:"fixed", left:"-5vw", top:"5vh", width:"60vw", color: "black" }}
                            value={this.state.email}
                            id="email"
                            type="email"
                            placeholder="Code" />
                       
                        </div>
                        <Card>
                            {this.state.data != null}
                        </Card>
                      
                        <Button onClick={ () => {this.func(); console.log(this.state.show)} } id="button2" style={{position: "fixed", top:"70vh", left:"75vw", width:"190px"}}  variant="contained" color="primary"> Search </Button>
            </div>
        );
    }
}


