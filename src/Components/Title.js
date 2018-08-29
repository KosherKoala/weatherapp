// Hunter Figueroa
// New Relic Code Challenge
// 2018 8 28
//
// Dynamic Title, adapts with user option choices in AppStore

import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import mobx, {toJS} from 'mobx';
import {observer} from 'mobx-react';

@observer
class Title extends Component {

  render() {
    var appStore = this.props.appStore;
    return (
      <div className="my-auto">
        {appStore.timeSpan.charAt(0).toUpperCase() + appStore.timeSpan.slice(1)} {appStore.high ? "High" : null} {appStore.low && appStore.high ? "/" : null} {appStore.low ? "Low" : null} Temperatures  for
      </div>
    );
  }
}

export default Title;
