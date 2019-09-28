import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well
import axios from "axios"; 
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import { getCookie } from '../CookieFunctions';
import SearchCode from "../SearchCode"

export default class Pie extends Component {

    constructor(props) {
        
        super(props);
// console.log(this.props);
        this.state = {
            name: this.props.nume,
            data: null,
            weights: null,
            username: this.props.username,
            url: null,
            show: true,
        };
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value }); 
    }
    getOption = () => {
        var val_total = [
        { name: 'Techincal skill', value: this.props.val[0]},
        { name: 'Engagement', value: this.props.val[1]},
        { name: 'Communication Skills', value: this.props.val[2]},
        { name: 'Innovation Percentage', value: this.props.val[3]},
        { name: 'Adaptability', value: this.props.val[4]}
        ];

        return {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
                data: ['', "this.state.name"]
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
                name: "this.state.name",
                type: 'radar',
                areaStyle: {normal: {}},
                data : [
                    
                    {
                        value : this.props.val,
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
      
        if (this.getOption() !== null) {
          document.querySelector("#button1").addEventListener("click", () => { window.location.href = this.state.url; })
        // this.setState({ ["open"]: false });
        
        }
        return (
            
            <div>
            
            <ReactEcharts
                option={this.getOption()}
                style={{padding:"10px", color:"white",height: '700px', width: '50%'}}
                className='react_for_echarts'
                onEvents={onEvents} 
            />
           

            </div>
        );
    }
}


