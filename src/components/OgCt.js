import React, { Component } from 'react';
import Child from './Child'


class OgCt extends Component {

 constructor(props) {
    super(props); 

    
  }

  render() {
        const tableHeaders= this.props.twMoYrSn != '' ? (
    <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Screen Name</th>
              <th># Mentions</th>
            </tr>
        ) : null
    

    return (
      
      <div >
         <h3>RHOC</h3>
         <div onClick={this.props.handleClick} id="vgunvalson">Vicki</div>
         <div onClick={this.props.handleClick} id="tamrabarney">Tamra</div>
         <div onClick={this.props.handleClick} id="rhoc_kellydodd">Kelly</div>
         <div onClick={this.props.handleClick} id="realocemily">Emily</div>
         <div onClick={this.props.handleClick} id="gkirschenheiter">Gina</div>
         <div onClick={this.props.handleClick} id="shannonbeador">Shannon</div>

           
         <h3>{this.props.selCast}</h3>
         <ul>
         	<li style={{fontWeight: this.props.displayType == 'detail' ? 'bold' : 'normal' }} onClick={this.props.handleViewClick}>Monthly</li>
         	<li style={{fontWeight: this.props.displayType == 'summary' ? 'bold' : 'normal' }} onClick={this.props.handleViewClick}>Summary</li>
         </ul>

         
          <table style={{display : this.props.displayDetail}}>
             {tableHeaders}
              {this.props.twMoYrSn}
          </table>

          <table style={{display : this.props.displaySummary}} >
            <tr>              
              <th>Screen Name</th>
              <th># Mentions</th>
            </tr>
              {this.props.tsSnTab}
          </table>


        
        
      </div>
    
    );
  
  }
}


export default OgCt;
