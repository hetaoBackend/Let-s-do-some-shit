import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import Graph from "./charts/Graph";
import { getCookie } from './CookieFunctions';


export default class Register extends Component {
    constructor() {
        super();

        this.state = {
          
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

    render() {

        return (
            <div style={{ marginLeft:"5vw", marginTop:"5vh", height: "30vh", display: "flex", flexDirection: "row" }}>
                <Card style={{height:"90vh", backgroundColor: "#f6edfc", padding: "1rem", width: "90vw" }}>
                    <CardContent>
                       <Graph/>
                    </CardContent>
                </Card>
            </div>
        );
    }
}


