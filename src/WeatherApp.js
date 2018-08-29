// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// Main Page: displays graph and Ui components

import React, { Component } from 'react';

// Plugins
import ReactChartkick, { LineChart } from 'react-chartkick'
import {Container, Row, Col,  Navbar, NavbarBrand, Alert} from 'reactstrap'
import Chart from 'chart.js';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';

// Store
import AppStore from './AppStore/AppStore'

//Components
import CityPicker from './Components/CityPicker';
import TimePicker from './Components/TimePicker';
import DegreePicker from './Components/DegreePicker';
import HLPicker from './Components/HLPicker';
import Title from './Components/Title';

// Styles
import './WeatherApp.css';

// Initialize adapter for ReactKick
ReactChartkick.addAdapter(Chart)

@observer
class WeatherApp extends Component {

  constructor(props){
    super(props);
    // Will handle state management and will de-clutter our UI code
    this.appStore = new AppStore();
  }

  componentDidMount(){ 
    // intitalize chart with default settings
    this.appStore.getChartData();
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>WeatherApp</NavbarBrand>
        </Navbar>
      <Container className="app-container">
        <Row>
          <Col className="d-flex">
            <div className="d-flex mx-auto">
              <Title appStore ={this.appStore}/>
              <CityPicker appStore ={this.appStore}/>
            </div>
          </Col>
        </Row> 
        <Row>
          <Col>
            <LineChart data={toJS(this.appStore.displayData)} 
                        min = {toJS(this.appStore.chartOptions.min)} 
                        max = {toJS(this.appStore.chartOptions.max)} 
            />
          </Col>
          <Col xs={3}>
            <DegreePicker appStore ={this.appStore}/>
            <HLPicker appStore ={this.appStore}/>
            <TimePicker  appStore={this.appStore}/>
          </Col>
        </Row>
        <Row>
          {this.appStore.errorMsg ? <Alert color="danger">{this.appStore.errorMsg}</Alert> : null }
        </Row>
      </Container>
      </div>
    );
  }
}

export default WeatherApp;
