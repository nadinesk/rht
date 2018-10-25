import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props); 

    this.state = {
      moyrsn: '',     
      twSn: '',
      stopWords: ['—','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'] 
    }
  }

  componentDidMount() {

      fetch('http://localhost:4000/api/books/tweetsuser/' + ) 
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
            twSn: sort_sn
          })          
        })                
  }

  render() {
    
    console.log('dat', this.state.moyrsn)

    const twtSn = this.state.twSn
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                             ];
    const oc_memb = ['TamraBarney', 'BravoRHOC', 'RHOC_KellyDodd', 'ShannonBeador','vgunvalson','MeghanKEdmonds',
                      'HeatherDubrow','RealOCEmily','GKirschenheiter','PeggySulahian']                            
    const twMoYrSn = Object.keys(this.state.moyrsn).map(key => 
        <tr style={{color: oc_memb.indexOf(this.state.moyrsn[key]['mo-yr'].split('-')[2] ) !== -1 ? 'orange' : 'blue'}}>
          <td>{monthNames[this.state.moyrsn[key]['mo-yr'].split('-')[0]]}</td>
          <td>{this.state.moyrsn[key]['mo-yr'].split('-')[1]}</td>
          <td>{this.state.moyrsn[key]['mo-yr'].split('-')[2]}</td>
          <td>{this.state.moyrsn[key]['count']}</td>
        </tr>
      )

    const tsSnTab = Object.keys(twtSn).map(key => 
        <tr style={{color: oc_memb.indexOf(twtSn[key]['screen_name'] ) !== -1 ? 'orange' : 'blue'}}>
          <td>{twtSn[key]['screen_name']}</td>
          <td>{twtSn[key]['count']}</td>
        </tr>
      )

    return (
      
      <div >
        
          <table>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Screen Name</th>
              <th># Mentions</th>
            </tr>
              {twMoYrSn}
          </table>

          <table>
            <tr>              
              <th>Screen Name</th>
              <th># Mentions</th>
            </tr>
              {tsSnTab}
          </table>


        
        
      </div>
    
    );
  
  }
}

export default App;

//gets unique screen names
          //let unique_sn = [...new Set(picked_flat.map(item => item.screen_name))]; 
          
          //gets unique month-year values
          //let unique_moyr = [...new Set(picked_flat.map(item => item.month_year))]; 
          
          //gets counts of tweets for each month-year-screenname combination
          /*var counts = picked_flat.reduce((p,c) => {
            var name = c.month_year_scrnm; 
            if(!p.hasOwnProperty(name)) {
              p[name] = 0;
            }
            p[name]++; 
            return p
          }, {}); */


          

        //  var countsExtended = Object.keys(counts).map(k => {
          // return {month_year_scrnm: k, count: counts[k]};
          //})

          //var twtMap = {}

          //var ce1 = countsExtended.forEach(function(twt) { twtMap[twt.month_year_scrnm] = twt; })

//          mys_flat.forEach(function(twt) {             
  //          twt.mo_yr_sn = twtMap[twt.month_year_scrnm]; 
    //      })


