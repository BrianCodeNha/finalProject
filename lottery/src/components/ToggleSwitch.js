import React, { Component } from "react";
import Switch from "react-switch";

export class ToggleSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span>Active</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}