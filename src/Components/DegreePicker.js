// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// UI for user to choose btw F and C

import React, { Component } from 'react';
import {FormGroup, Input, Label} from 'reactstrap'

import mobx, {toJS} from 'mobx';
import {observer} from 'mobx-react';

@observer
class DegreePicker extends Component {

  render() {
    return (
      <FormGroup tag="fieldset">
        <div>F/C</div>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onClick = {this.props.appStore.setF}  checked ={this.props.appStore.mode == "F" ? "checked" : ""}/>{' '}
          F
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" onClick = {this.props.appStore.setC}  checked = {this.props.appStore.mode == "C" ? "checked" : ""}/>{' '}
          C
          </Label>
        </FormGroup>
      </FormGroup>
    );
  }
}

export default DegreePicker;
