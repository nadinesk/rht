import React, { Component } from 'react';


class Child extends Component {

constructor(props) {
        super(props)
       
}

componentDidMount() {
 
}

componentWillReceiveProps(nextProps) {

}

	render() {	
    		const blah = this.props.tweetText.map(b => <div>{b}</div>)
		return (		
     <div>
      
           <div>{blah}</div>
    </div>
    
  	)
  }
}

export default Child;
