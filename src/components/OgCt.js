import React, { Component } from 'react';
import Child from './Child'
import {Grid, Col, Row, Nav, NavItem, PageHeader, Table } from 'react-bootstrap'


class OgCt extends Component {

 constructor(props) {
    super(props); 

    
  }

  render() {
        const tableHeaders= this.props.twMoYrSn != '' ? (
        <thead>
          <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Screen Name</th>
              <th># Mentions</th>
            </tr>
        </thead>
        ) : null
    

    return (
      <Grid>
      <PageHeader className='cityHeader'>Orange County</PageHeader>
      
          <Nav bsStyle="pills" className='castMembs'>         
             <NavItem onClick={this.props.handleClick} id="vgunvalson" className={this.props.selCast == 'vgunvalson' ? 'selCM' : 'notSelCM'} >Vicki</NavItem>
             <NavItem onClick={this.props.handleClick} id="tamrabarney" className={this.props.selCast == 'tamrabarney' ? 'selCM' : 'notSelCM'}>Tamra</NavItem>
             <NavItem onClick={this.props.handleClick} id="rhoc_kellydodd" className={this.props.selCast == 'rhoc_kellydodd' ? 'selCM' : 'notSelCM'}>Kelly</NavItem>
             <NavItem onClick={this.props.handleClick} id="realocemily" className={this.props.selCast == 'realocemily' ? 'selCM' : 'notSelCM'}>Emily</NavItem>
             <NavItem onClick={this.props.handleClick} id="gkirschenheiter" className={this.props.selCast == 'gkirschenheiter' ? 'selCM' : 'notSelCM'}>Gina</NavItem>
             <NavItem onClick={this.props.handleClick} id="shannonbeador" className={this.props.selCast == 'shannonbeador' ? 'selCM' : 'notSelCM'}>Shannon</NavItem>
          </Nav>         
        
          <h4><a className='dispTypes' style={{display:this.props.selCast =='' ? 'none' : 'inline-block'}} target="#" href={"http://www.twitter.com/" + this.props.selCast}>@{this.props.selCast}</a></h4>
           <Nav bsStyle="pills" className='dispTypes'>
            <NavItem id={this.props.displayType=="detail" ? "detailSelect" : "otherDetail"} style={{fontWeight: this.props.displayType == 'detail' ? 'bold' : 'normal' , display:this.props.displayType == '' ? 'none' : 'inline-block'}} onClick={this.props.handleViewClick}>Monthly</NavItem>
            <NavItem id={this.props.displayType=="summary" ? "detailSelect" : "otherDetail"} style={{fontWeight: this.props.displayType == 'summary' ? 'bold' : 'normal', display:this.props.displayType == '' ? 'none' : 'inline-block' }} onClick={this.props.handleViewClick}>Summary</NavItem>
           </Nav>
          <Row>
            
              <Table style={{display : this.props.displayDetail}} className='tabDetail'>
                 {tableHeaders}
                  {this.props.twMoYrSn}
              </Table>
            
          </Row>
          <Table style={{display : this.props.displaySummary}} >
            <tr>              
              <th>Screen Name</th>
              <th># Mentions</th>
            </tr>
              {this.props.tsSnTab}
          </Table>


        
        
      </Grid>
    
    );
  
  }
}


export default OgCt;