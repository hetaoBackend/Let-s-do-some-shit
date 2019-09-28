import React, { Component } from 'react';
import { Input, Typography, Button, CardContent, Card, Slider } from '@material-ui/core';
// this needs to be renamed to signup as a recruiter
// This can be the update preferences stuff as well

import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');


export default class Radar extends Component {
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
    getOption = () => {
        return {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
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
                   { name: '销售（sales）', max: 6500},
                   { name: '管理（Administration）', max: 16000},
                   { name: '信息技术（Information Techology）', max: 30000},
                   { name: '客服（Customer Support）', max: 38000},
                   { name: '研发（Development）', max: 52000},
                   { name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配（Allocated Budget）'
                    },
                     {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销（Actual Spending）'
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
      

        return (
            
            <div style={{display:"flex", flexDirection:"row"}}>
            <ReactEcharts
                option={this.getOption()}
                style={{padding:"10px", color:"white",height: '700px', width: '50%'}}
                className='react_for_echarts'
                onEvents={onEvents} 
            />
            <h1> some list or chart here</h1>

            </div>
        );
    }
}


