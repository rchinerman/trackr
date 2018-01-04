import React, { Component } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import '../styles/FollowingList.css';

const profileIcon = {
  display: 'inline',
  'maxWidth': '30px',
  'marginRight': '.75em'
};

const font = {
  fontFamily: 'Montserrat, sans-serif',
  'opacity':'0.87'    
};

const rowElement = {
  'verticalAlign': 'middle',
  'opacity':'0.87'  
}

const unranked = {
  'verticalAlign': 'middle',  
  'opacity':'0.37'
}

function TableRow({ rowNumber, 
                    summonerName, 
                    region, 
                    icon,
                    lastUpdate,
                    solo, 
                    flex, 
                    threes }) {
  return (
    <tr style={ font }>
      <td>      
        <Image 
          src={`http://ddragon.leagueoflegends.com/cdn/7.24.1/img/profileicon/${icon}.png`} 
          responsive 
          rounded 
          style={profileIcon}
        />    
      </td>
      <td style={rowElement}>{summonerName}</td>
      <td style={rowElement}>{region}</td>
      <td style={solo==="UNRANKED" ? unranked : rowElement}>{solo}</td>
      <td style={flex==="UNRANKED" ? unranked : rowElement}>{flex}</td>
      <td style={threes==="UNRANKED" ? unranked : rowElement}>{threes}</td>
    </tr>
  );
}

class FollowingList extends Component {  
  renderContent(){
    const followed = this.props.following;
    switch (followed){
      case null:
        return null;
      default:
        let row = followed.map((data, i) => {
          return <TableRow
                  rowNumber={i+1}
                  summonerName={data.summoner}
                  region={data.region.toUpperCase()}
                  icon={data.icon}
                  lastUpdate={data.lastUpdate}
                  solo={data.solo ? `${data.solo.rank.tier} ${data.solo.rank.rank} - ${data.solo.rank.leaguePoints} LP` : "UNRANKED"}
                  flex={data.flex ? `${data.flex.rank.tier} ${data.flex.rank.rank} - ${data.flex.rank.leaguePoints} LP` : "UNRANKED"}
                  threes={data.threes ? `${data.threes.rank.tier} ${data.threes.rank.rank} - ${data.threes.rank.leaguePoints} LP` : "UNRANKED"}
                />
        })
        return row;
    }
  }

  render = () => {
    if(this.props.following === null){
      return (
        <div className='text-center'>
          <Spinner color='#B993D6'/>
        </div>
      )
    } 
    else if(this.props.following.length === 0){
      return (
        <div className='text-center'>
          <div style={ font }>You're not following anyone!</div>
          <Link to="/follow">
            <Button className="follow-button">Follow</Button>
          </Link>
        </div>
      )
    } 
    else {
      return (
        <Table responsive>
          <thead style={ font }>
            <tr>
              <th></th>
              <th>Summoner Name</th>
              <th>Region</th>
              <th>Solo</th>
              <th>Flex</th>
              <th>Threes</th>
            </tr>
          </thead>
          <tbody>
            {this.renderContent()}
          </tbody>
        </Table>
      );
    }
  };
};

const mapStateToProps = ({following}) => {
  return { following };
};

export default connect(mapStateToProps)(FollowingList);