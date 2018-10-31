import React, { Component } from 'react';
import Child from './Child'


class Ny extends Component {

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
			<h3>RHONY</h3>
	        <div onClick={this.props.handleClick} id="caroleradziwill">Carole</div>
	        <div onClick={this.props.handleClick} id="ramonasinger">Ramona</div>
	        <div onClick={this.props.handleClick} id="dorindamedley">Dorinda</div>
	        <div onClick={this.props.handleClick} id="bethenny">Bethenny</div>
	        <div onClick={this.props.handleClick} id="sonjatmorgan">Sonja</div>
	        <div onClick={this.props.handleClick} id="countessluann">Luann</div>
	        <div onClick={this.props.handleClick} id="tinsleymortimer">Tinsley</div>

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

export default Ny;
