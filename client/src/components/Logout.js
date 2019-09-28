import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import axios from "axios";
import {setCookie, getCookie, eraseCookie} from "./CookieFunctions.js";




export default class Register extends Component {
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
    componentDidMount () {
        eraseCookie("token");
        eraseCookie("username");
        console.log("token =" + getCookie("token"));
        window.location.href = "./";
    }

    

    render() {

        return (
            <div> </div>
        );
    }
}


