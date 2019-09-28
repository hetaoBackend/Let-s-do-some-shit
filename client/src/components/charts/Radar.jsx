import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import axios from "axios"; 
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import { getCookie } from '../CookieFunctions';


export default class Radar extends Component {

    constructor(props) {
        
        super(props);
// console.log(this.props);
        this.state = {
            name: this.props.nume,
            data: null,
            weights: null,
            username: this.props.username,
            url: null
        };
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value }); 
    }
    getOption = () => {
        var a;
        // console.log(this.state.data);
        if (this.state.data === null || this.state.data === undefined) {
            // if (this.state.name === "")
            //     return null

            axios({
            method: 'POST',
            responseType:'application/json',
            // data: {
            //     email: this.state.name
            // },
            // add the fucking email
            // ####################
            // ####################
            // ####################
            // ####################
            url: "http://10.0.50.126:5000/weights",
            data : {
                email : (getCookie("username") === undefined) ? "tibi1" : getCookie("username")
            },
            }).then((e) => {
                // console.log(e.data);
                a = e.data;
                this.setState({
                    name: this.state.name,
                    data: a,
                    weights: this.state.weights,
                    url: this.state.url,
                    username: this.state.username
                });
                // console.log(this.state);
            }
            ).catch(function (error) {
            console.log(error);
            });

            
            return null;
        }
        if (this.state.weights === null || this.state.weights == undefined || this.state.weights === "") {
            
            var dd;
            var urll;
            axios({
                method: 'POST',
                responseType:'application/json',
                url: "http://10.0.50.126:5000/user/",
                data: {
                    username: this.props.username
                }
            }).then((e) => {
                // console.log(e.data);
                dd = e.data;
                // console.log(e.data);
                this.setState({name:getCookie("username"),
                    data: this.state.data,
                    weights: dd,
                    username: this.props.username,
                    name: this.props.nume,
                    url: e.data.url 
                });
                // console.log(this.state);
            }
            ).catch(function (error) {
                console.log(error);
            });
            }
        // console.log(this.state.data);
        if (this.state.data === null || this.state.data ==="")
            return null;
        if (this.state.data.weights === null || this.state.data.weights === undefined)
            return null;
        var b = this.state.data.weights.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        if (this.state.weights === null || this.state.weights === undefined)
            return null;
        // console.log(this.state.weights);
        var c = Object.values(this.state.weights);
        // var c = [1,2,3,4,5]
        var bbb = [0,0,0,0,0]

        for (let  i = 0 ; i < 5 ; i++)
            bbb[i] = (c[i]  * 0.7) * (b[i] + 50) % 100 + 20;
        return {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
                data: ['', this.state.name]
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                   }
                },
                indicator: [
                   { name: 'Techincal skill', max: 100},
                   { name: 'Engagement', max: 100},
                   { name: 'Communication Skills', max: 100},
                   { name: 'Innovation Percentage', max: 100},
                   { name: 'Adaptability', max: 100},
                ]
            },
            series: [{
                name: this.state.name,
                type: 'radar',
                areaStyle: {normal: {}},
                data : [
                    
                    {
                        value : bbb,
                        name: "Developer Performance"
                    }
                ]
            }]
        };
      
    }
    onSubmit = e => {
        console.log(this.state);
    }

    render() {
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
          }
      
        if (this.getOption() !== null) 
          document.querySelector("#button1").addEventListener("click", () => { window.location.href = this.state.url; })
        return (
            
            <div style={{display:"flex", flexDirection:"row"}}>
            {/* <div>
            <h1>
                Developer Radar
            </h1>
            </div> */}
            {(this.getOption() === null) ? <div> </div> :
            <ReactEcharts
                option={this.getOption()}
                style={{padding:"10px", color:"white",height: '700px', width: '50%'}}
                className='react_for_echarts'
                onEvents={onEvents} 
            />
            }
            {/* <h1> some list or chart here</h1> */}
            {/* create some charts in there */}

            </div>
        );
    }
}


