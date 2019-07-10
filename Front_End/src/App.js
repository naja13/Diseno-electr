import React, { Component } from 'react';
import * as Routes from './Constants/routes';
import { Route, BrowserRouter } from 'react-router-dom';
import Historicos from './Components/HistMap';
import Home from './Components/Home';
import Real from './Components/Real';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';
import Count from './Components/Count';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

class App extends Component {  
  constructor(){
    super()
    if(JSON.parse(localStorage.getItem('Session'))){
      this.state = {
        login : JSON.parse(localStorage.getItem('Session')).login
      }     
    }else{
      this.state = {
        login : false
      }
      localStorage.setItem('Session', JSON.stringify({login:false}));   
    }    
  }
  componentWillUpdate(){
  
    var login = JSON.parse(localStorage.getItem('Session'));
    this.setState({login:login.login})
    console.log("estebro: ",this.state.login)
  
  }
  // 3.95.47.65
  render() {
    localStorage.setItem('url', JSON.stringify({url: '3.95.47.65'}));
    if(!JSON.parse(localStorage.getItem('cars'))){localStorage.setItem('cars', JSON.stringify({name :undefined }));}   
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route component={Home} path={Routes.Home} />
            {this.state.login && 
            <Route component={Real} path={Routes.Real} />
            }{this.state.login && 
            <Route component={Historicos} path={Routes.Hist} />
            }
            {this.state.login ? null :
            <Route onSelectLog={this.onLog} component={SignIn} path={Routes.SignIn} />          
            }{this.state.login && 
            <Route component={Count} path={Routes.Count} />
            }
            <Route component={SignUp} path={Routes.SignUp} />          
            <Route component={Contact} path={Routes.Contact} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;