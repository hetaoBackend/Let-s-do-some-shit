import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';
import Radar from "./Radar.jsx";




import { Modal} from '@material-ui/core';
import axios from 'axios';
import { getCookie } from '../CookieFunctions.js';
import { nullLiteral } from '@babel/types';

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      name: "",
      data: "{}",
    }
    this.handleClose = this.handleClose.bind(this);
    this.onChartClick = this.onChartClick.bind(this);
  }

  
  getOption = () => {
    var a;
    axios({
      method: 'GET',
      responseType:'application/json',
      url: "http://172.16.199.75:5000/dashboard/",
    }).then((e) => {
        console.log(e.data);
        a = e.data;
        this.setState({name:"asdasdsa",
          open: false,
          data: a
        });
        console.log(this.state);
    }
    ).catch(function (error) {
      console.log(error);
    });

  if (this.state.data === null || a === undefined) 
    return null;
  else
   return {
    legend: {
      data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
    },
    series: [{
      type: 'graph',
      layout: 'force',
      animation: false,
      label: {
        normal: {
          position: 'right',
          formatter: '{b}'
        }
      },
      draggable: true,
      data: a.nodes.map(function (node, idx) {
        node.id = idx;
        return node;
      }),
      categories: a.data.categories,
      force: {
        // initLayout: 'circular'
        // repulsion: 20,
        edgeLength: 5,
        repulsion: 20,
        gravity: 0.2
      },
      edges: a.data.links
    }]
  }
};

  onChartClick (e) {
    console.log(e);
    this.setState({["name"]: e.data.name});
    this.setState({ ["open"]: true });
  }

  handleClose = () => {
      this.setState({["open"]: false});
  };

  render() {
    let onEvents = {
      'click': this.onChartClick,
      'legendselectchanged': this.onChartLegendselectchanged
    }

    const Fade = React.forwardRef(function Fade(props, ref) {
      const { in: open, children, onEnter, onExited, ...other } = props;
      const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
          if (open && onEnter) {
            onEnter();
          }
        },
        onRest: () => {
          if (!open && onExited) {
            onExited();
          }
        },
      });
    
      return (
        <animated.div ref={ref} style={style} {...other}>
          {children}
        </animated.div>
      );
    });
    // const useStyles = makeStyles(theme => ({
    //   modal: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
    //   paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     border: '2px solid #000',
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(2, 4, 3),
    //   },
    // }));


    const stylePaper = {
      backgroundColor: "white",
      border: '2px solid #000',
      borderRadius: "2px",
      
      boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
      padding: "20px",
      top:"100px",
      left: "auto",
      width: "80vw",
      height: "80vh"
    }
    
    return (
      <div className='examples'>
        <div className='parent'>
        {
          (this.state.data === null || this.getOption() === null) ? <div> </div> :
          <ReactEcharts
            option={this.getOption()}
            style={{color:"white",height: '700px', width: '100%'}}
            className='react_for_echarts'
            onEvents={onEvents} 
            />
        }
        </div>
                
        <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
          <div style={stylePaper}>
            <h2 id="spring-modal-title">{this.state.name}</h2>
            <Radar/>
          </div>
        </Fade>
      </Modal>
    </div>
    );
  }
}
