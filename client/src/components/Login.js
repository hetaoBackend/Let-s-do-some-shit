import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card } from '@material-ui/core';
// add the router and add the stuf to change the 2 blocks in the start so that you can register either as a developer or as a recruiter
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from "axios";
import {setCookie, getCookie, eraseCookie} from "./CookieFunctions.js";


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    onRegister () {
        window.location.href = "./register";
        // console.log(getCookie("token"));
    }
    componentWillMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        // Check the name in frontend

    //     if (getCookie("token") !== null) {
    //         window.location.href = './dashboard';
    //     }
    // }
    }

    componentWillReceiveProps(nextProps) {
        // if (getCookie("token") !== null) {
        //     window.location.href = './dashboard';
        // }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            username: this.state.email,
            password: this.state.password
        };
        // var ret = axios.post({
        //     baseUrl: "http://172.16.199.75:5000",
        //     url: "login",
        //     data: {userData},
        //   });
        // const instance = axios.create({
        //     baseURL: 'https://some-domain.com/api/',
        //     timeout: 1000,
        //     headers: {'X-Custom-Header': 'foobar'}
        //   });
        //   instance
        axios({
            method: 'POST',
            responseType:'application/json',
            url: "http://127.0.0.1:5000/login",
            data: {
                    username : userData.username,
                    password: userData.password
            },
          }).then((e) => {
              console.log(e.data);
              setCookie("token", e.data.token, 10);
              setCookie("username", this.state.email, 10);
        window.location.href = "./dashboard";


                
              
          }
          ).catch(function (error) {
            console.log(error);
          });
        //   console.log(ret);

        // this.props.loginUser(userData);
    };
    render() {

        return (
        <div style={{ position:"fixed", marginLeft: "30vw", width: "70%", marginTop: '35vh', overflow: "hidden" }} className="dashboard valign-wrapper">

            <div style={{ height: "30vh", display: "flex", flexDirection: "row" }}>
                <Card style={{ backgroundColor: "rgb(58, 65, 73)", padding: "1rem", borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: "20vw" }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" style={{ color: "white" }} gutterBottom>Login</Typography>
                        <div style={{display:"flex", flexDirection:"column"}}> 
                        <Input onChange={this.onChange} style={{marginBottom:"20px", marginTop:"20px", color: "white" }}
                            value={this.state.email}
                            id="email"
                            type="email"
                            placeholder="Username" />
                        <Input style={{ color: "white" }}
                            onChange={this.onChange}
                            value={this.state.password}
                            id="password"
                            type="password"
                            placeholder="Password" />
                            </div>
                        <Button type="submit" onClick={this.onSubmit} style={{ width:"19rem", backgroundColor: "#5C20D8", margin: "2em 0 0 0" }}>login</Button>
                    </CardContent>

                </Card>
                <Card style={{ backgroundColor: "#00", padding: "1rem", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10, width: "20vw" }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>SignUp</Typography>
                        <Typography variant="body2" color="textSecondary" component="p"> Learn about developers and get inspired in the process. Learn about their code. To be the best you should learn from the best so register right now.</Typography>
                        <div>
                            <Button onClick={this.onRegister} style={{color:"white", width:"19rem", backgroundColor: "#3A4149", margin: "3.7em 0 1rem 0rem" }}>Register</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </div>
        );
    }
}


