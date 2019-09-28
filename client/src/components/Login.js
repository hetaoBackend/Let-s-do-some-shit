import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card } from '@material-ui/core';
// add the router and add the stuf to change the 2 blocks in the start so that you can register either as a developer or as a recruiter



export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        // Check the name in frontend
        if (false) {
            window.location.href = './dashboard';
        }
    }

    componentWillReceiveProps(nextProps) {
        if (false) {
            window.location.href = './dashboard';
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

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
                        <Typography variant="body2" color="textSecondary" component="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</Typography>
                        <div>
                            <Button style={{color:"white", width:"19rem", backgroundColor: "#3A4149", margin: "3.7em 0 1rem 0rem" }}>Register</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </div>
        );
    }
}


