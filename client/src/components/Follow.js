import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import axios from 'axios';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Follow extends Component {
  constructor(props){
    super(props);
    this.state = { 
      region: 'na',
      summoner: ''
    };
  }

  onSelect = async (e) => {
    await this.setState({ region: this.inputEl.value });
  }

  onTextEntered = async (e) => {
    await this.setState({ summoner: e.target.value });   
    console.log(this.state.summoner); 
  }

  submitFollow = async () => {
    const res = await axios.get(`/api/follow/${this.state.region}/${this.state.summoner}`); 
    console.log(res);   
  }

  render(){
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>
          Follow
        </h1>
        <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Summoner"
          placeholder="Enter summoner"
          value={this.state.summoner}
          onChange={this.onTextEntered}
        />
        <ControlLabel>Region</ControlLabel>
        <FormControl 
          componentClass="select" 
          placeholder="select"
          onChange={this.onSelect.bind(this)}
          inputRef={ el => this.inputEl=el }
        >
            <option value="br">Brazil</option>
            <option value="eune">Europe Nordic & East</option>
            <option value="euw">Europe West</option>
            <option value="kr">Korea</option>
            <option value="lan">Latin America North</option>
            <option value="las">Latin America South</option>
            <option selected value="na">North America</option>
            <option value="oce">Oceania</option>
            <option value="ru">Russia</option>
            <option value="tr">Turkey</option>
            <option value="jp">Japan</option>
        </FormControl>
        <Button onClick={this.submitFollow}>Submit</Button>
        </form>
      </div>
    )
  }
}

export default Follow;