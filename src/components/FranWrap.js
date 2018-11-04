import React, { Component } from 'react';
import Child from './Child'
import OgCt from './OgCt'
import Ny from './Ny'
import Home from './Home'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import {Navbar, Nav, NavItem, Table} from 'react-bootstrap'


class FranWrap extends Component {

 constructor(props) {
    super(props); 

    this.state = {
      moyrsn: '',     
      twSn: '',
      selCast: '',
      showTweets:{},
      displaySummary: 'none',
      displayDetail: 'table',
      displayType: '',      
      selCity:'',
      stopWords: ['—','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'] 

    }

    this.handleClick = this.handleClick.bind(this)
    this.handleTweetShow = this.handleTweetShow.bind(this)
    this.handleViewClick = this.handleViewClick.bind(this)
    this.firstLoad = this.firstLoad.bind(this)
  }

  

  handleClick = event => {
     
     const textClick = event.target.id 

     fetch('https://dark-vampire-43534.herokuapp.com/api/tweets/tweetsuser/' + textClick) 
        .then(res => 
          res.json()
        ).then(arts => {
          
          const result = arts.filter(word => word.entities.user_mentions[0])

          //creates refined results
          const picked = result.map(({ created_at, entities, text}) => [{'month': new Date(created_at).getMonth(), 
                                                                  'year': new Date(created_at).getFullYear(),                                                                   
                                                                  'screen_name': entities.user_mentions[0].screen_name, 
                                                                  'text': text,                                                                  
                                                                  'month_year': new Date(created_at).getMonth() + '-' + new Date(created_at).getFullYear(), 
                                                                  'month_year_scrnm': new Date(created_at).getMonth() + '-' 
                                                                  + new Date(created_at).getFullYear() + '-' 
                                                                  + entities.user_mentions[0].screen_name }]);
          

          //flattens out results
          const picked_flat = picked.flat()

          //creates new array of arrays with refined values
          const mys = picked_flat.map(({ month_year_scrnm, text}) => [{'month_year_scrnm': month_year_scrnm, 'text': text }]);

          //flattens out mys results
          const mys_flat = mys.flat()                  

          //adds all tweets to matching mo_yr_sn         
          var ctwt = mys_flat.reduce(function(r, o){              
            var k = o.month_year_scrnm
              if (r[k] || (r[k]=[])) r[k].push(o.text);
              return r; 
          }, {});


          //creates new array of arrays with refined values
          const tsn = picked_flat.map(({ screen_name, text}) => [{'screen_name': screen_name, 'text': text }]);

          //flattens out mys results
          const tsn_flat = tsn.flat()                  

          //adds all tweets to matching mo_yr_sn         
          var sntwt = tsn_flat.reduce(function(r, o){              
            var k = o.screen_name
              if (r[k] || (r[k]=[])) r[k].push(o.text);
              return r; 
          }, {});


          function wordFreq(string, removeWords) {
                var words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
                var freqMap = {};
                words.forEach(function(w) {
                    if (!freqMap[w]) {
                        freqMap[w] = 0;
                    }
                    freqMap[w] += 1;
                });

                removeWords.forEach(e => delete freqMap[e])

                var sortable = [];

              for (var words in freqMap) {
                  sortable.push([words, freqMap[words]]);
              }

              sortable.sort(function(a, b) {
                  return b[1] - a[1];
              })

              return sortable
          }

          for (var key in ctwt) {
            if (ctwt.hasOwnProperty(key)) {
                ctwt[key]['word_freq'] = wordFreq(ctwt[key].join(),this.state.stopWords)
                ctwt[key]['count'] = ctwt[key].length
                ctwt[key]['mo-yr'] = key
            }
          }

          for (var key in sntwt) {
            if (sntwt.hasOwnProperty(key)) {
                sntwt[key]['word_freq'] = wordFreq(sntwt[key].join(),this.state.stopWords)
                sntwt[key]['count'] = sntwt[key].length
                sntwt[key]['screen_name'] = key
            }
          }

          //convert object with arrays to array of arrays
          var sort_sn = Object.values(sntwt)          

          //sort by count
          sort_sn.sort(function(a,b) {
            return b.count - a.count
          })

          console.log('newArrayDataOfOjbect', sort_sn)

          this.setState({
            moyrsn: ctwt, 
            twSn: sort_sn, 
            selCast: textClick, 
            displaySummary: 'none', 
            displayDetail: 'table', 
            displayType: 'detail'
          })          
        })             

  }

  handleTweetShow(event) {
    this.state.showTweets[event.target.id] ? 
    this.setState({
      showTweets:{
        ...this.state.showTweets,
        [event.target.id]: false
      }
    }) : this.setState({
      showTweets:{
        ...this.state.showTweets,
        [event.target.id]: true
      }
    }) 
  }

  handleViewClick() {
    
    this.state.displayDetail == 'table' && this.state.displaySummary == 'none' ? 
      this.setState({
        displayDetail: 'none', 
        displaySummary: 'table',
        displayType: 'summary'
      }) : 
        this.setState({
        displayDetail: 'table', 
        displaySummary: 'none', 
        displayType: 'detail'
      }) 
  }

  firstLoad(event) {
    
      const sc = event.target.id=='oc' ? 'ocSel' : event.target.id=='ny' ? 'nySel' : ''

          this.setState({
            moyrsn: '', 
            twSn: '',
            selCast: '',
            displayType:'', 
            selCity: sc
          })          
       
  }

  render() {
    
    console.log('this.state.moyrsn', this.state.moyrsn)
    console.log('this.state.sort_sn', this.state.twSn)
    console.log('this.state.showTweets', this.state.showTweets)
    

    const twtSn = this.state.twSn
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                             ];
    const oc_memb = ['tamrabarney', 'bravorhoc', 'rhoc_kellydodd', 'shannonbeador','vgunvalson','realocemily','gkirschenheiter']                            

    const ny_memb = ['caroleradziwill', 'ramonasinger', 'dorindamedley', 'bethenny', 'countessluann','sonjatmorgan', 'tinsleymortimer']                        
    


    const twMoYrSn = Object.keys(this.state.moyrsn).map((key,index) => 
      
        <tbody>
          <tr className={oc_memb.indexOf(this.state.moyrsn[key]['mo-yr'].split('-')[2].toLowerCase() ) !== -1 ? 'orangeLink' : 
                  ny_memb.indexOf(this.state.moyrsn[key]['mo-yr'].split('-')[2].toLowerCase() ) !== -1 ? 'redLink' : 
                  (this.state.moyrsn[key]['mo-yr'].split('-')[2].toLowerCase() == 'andy' || 
                    this.state.moyrsn[key]['mo-yr'].split('-')[2].toLowerCase() == 'bravoandy' || 
                    this.state.moyrsn[key]['mo-yr'].split('-')[2].toLowerCase() == 'bravotv' || 
                    this.state.moyrsn[key]['mo-yr'].split('-')[2].toLowerCase() == 'bravowwhl') ? 'purpleLink' : 'blueLink'}>
            <td>{monthNames[this.state.moyrsn[key]['mo-yr'].split('-')[0]]}</td>
            <td>{this.state.moyrsn[key]['mo-yr'].split('-')[1]}</td>
            <td className='handleLink'><a href={"https://twitter.com/" + this.state.moyrsn[key]['mo-yr'].split('-')[2]} >{this.state.moyrsn[key]['mo-yr'].split('-')[2]}</a></td>
            <td onClick={this.handleTweetShow} id={key}>{this.state.moyrsn[key]['count']}</td>    
              {this.state.showTweets[key] ? <Child tweetText={this.state.moyrsn[key]}/> : null}
          </tr>
        </tbody>
        
      )

    const tsSnTab = Object.keys(twtSn).map(key => 
        <tbody>
          <tr className={oc_memb.indexOf(twtSn[key]['screen_name'].toLowerCase() ) !== -1 ? 'orangeLink' : 
                              ny_memb.indexOf(twtSn[key]['screen_name'].toLowerCase() ) !== -1 ? 'redLink' : 
                              (twtSn[key]['screen_name'].toLowerCase()  == 'andy' ||
                              twtSn[key]['screen_name'].toLowerCase()  == 'bravoandy' ||
                              twtSn[key]['screen_name'].toLowerCase()  == 'bravotv' ||
                twtSn[key]['screen_name'].toLowerCase()  == 'bravowwhl')
                               ? 'purpleLink' : 'blueLink'}>
            <td ><a  href={"https://twitter.com/" + twtSn[key]['screen_name']} >{twtSn[key]['screen_name']}</a></td>
            
              <td onClick={this.handleTweetShow} id={key}>{twtSn[key]['count']}</td>
              {this.state.showTweets[key] ? <Child tweetText={twtSn[key]}/> : null}
          </tr>
        </tbody>
      )

    return (
      
      

           <Router>
           <div>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link onClick={this.firstLoad} to="/">Home</Link>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                  <NavItem>
                    <Link onClick={this.firstLoad} id='oc' className={this.state.selCity=='ocSel' ? 'citySel' : 'oSel'} to="/oc">Orange County</Link>
                  </NavItem>
                  <NavItem>
                    <Link onClick={this.firstLoad} id='ny'  className={this.state.selCity=='nySel' ? 'citySel' : 'oSel'}  to="/ny">NY</Link>
                  </NavItem>

                </Nav>
            </Navbar>
              <Route exact path="/" component={Home}/>
              <Route  path="/oc" render={(props) => <OgCt {...props}  handleClick={this.handleClick} 
              displayDetail={this.state.displayDetail} 
              displaySummary={this.state.displaySummary} 
              handleViewClick={this.handleViewClick} 
              handleTweetShow={this.handleTweetShow}
              twMoYrSn={twMoYrSn}
              tsSnTab={tsSnTab}
              selCast={this.state.selCast}
              displayType={this.state.displayType} />} />

              <Route  path="/ny" render={(props) => <Ny {...props}  handleClick={this.handleClick} 
              displayDetail={this.state.displayDetail} 
              displaySummary={this.state.displaySummary} 
              handleViewClick={this.handleViewClick} 
              handleTweetShow={this.handleTweetShow}
              twMoYrSn={twMoYrSn}
              tsSnTab={tsSnTab}
              selCast={this.state.selCast}
              displayType={this.state.displayType} />} />
            </div>
        </Router>
        

    
    );
  
  }
}


export default FranWrap;