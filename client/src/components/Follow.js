import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/Follow.css';

const font = {
  fontFamily: 'Montserrat, sans-serif'
};

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
  }

  submitButton = async () => {
    this.props.submitFollow(this.state.region, this.state.summoner);
    await this.setState ({ summoner: '' });    
  }

  renderAlert = () => {
    if(this.props.error[0]){
      console.log(this.props.error[0])
      return <Alert bsStyle="danger" style={ font }>
              <strong>Oh heck no.</strong> {this.props.error[0].response.data}
            </Alert>
    }
    else if(this.props.followSuccess){
      return <Alert bsStyle="success" style={ font }>
                <strong>Yaaaas.</strong> Summoner followed.
              </Alert>
    }
  }

  componentWillUnmount = () => {
    this.props.pageLeave();
  }

  render(){
    return (
      <Col xs={10} xsOffset={1} md={4} mdOffset={4}>
        <form>
        {this.renderAlert()}
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Summoner"
          placeholder="Enter summoner"
          value={this.state.summoner}
          onChange={this.onTextEntered}
          style={ font }
        />
        <ControlLabel>Region</ControlLabel>
        <FormControl 
          componentClass="select" 
          placeholder="select"
          onChange={this.onSelect.bind(this)}
          inputRef={ el => this.inputEl=el }
          defaultValue={this.state.region}
          style={ font }
        >
            <option value="br">Brazil</option>
            <option value="eune">Europe Nordic & East</option>
            <option value="euw">Europe West</option>
            <option value="kr">Korea</option>
            <option value="lan">Latin America North</option>
            <option value="las">Latin America South</option>
            <option value="na">North America</option>
            <option value="oce">Oceania</option>
            <option value="ru">Russia</option>
            <option value="tr">Turkey</option>
            <option value="jp">Japan</option>
        </FormControl>
        <div class="text-center">
          <Button  style={ font } className="follow-submit-button" onClick={this.submitButton}>Follow</Button>
        </div>
        </form>
      </Col>
    )
  }
}

const mapStateToProps = ({error, followSuccess}) => {
  return { error, followSuccess };
};

export default connect(mapStateToProps, actions)(Follow);