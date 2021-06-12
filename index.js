import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase from './fire.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: false
    };


    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
 
    
  }

  componentDidMount() {
    //when you hit reload, this will check if you already logged in
    //and will set the user variable accordingly.

    //set loading to true when fetching data for authentication
    this.setState({ loading: true });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
      //when data is loaded, set loading to false
      this.setState({ loading: false });
    });

    firebase.auth().getRedirectResult().then( function (result){
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      //Set the state user variable
      this.setState({ user });
      // ...
      }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        
    });
  }

  login(){
    //console.log("sign-in");
   

    //This code will setup the Google login page
    const provider = new firebase.auth.GoogleAuthProvider();

    //reloads the page, and tries to sign in
    //when you reload the page, componentDidMount() will execute
    firebase.auth().signInWithRedirect(provider);
  }

  logout() {
    //This will sign out of firebase authentication and set
    //the user variable to null
    firebase.auth().signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  render() {
    if(this.state.loading){
      return (
        <div> Loading... </div>
      )
    }else if( this.state.user == null){
      return (
        <div>
          
          Click below to Login with your Google Account <br /><br />
          <button onClick={this.login}>Log In</button> 
          <br />
        </div>
       
      )
    } else {
      return (
        <div>
                <button onClick={this.logout}>Log Out</button>
                <br/><br/>
                Hello {this.state.user.displayName}, you are logged in!
                <br/><br />
                Your Google email is { this.state.user.email }
                <br /><br />
                Your Google Photo ID is: <br />
                <img src={this.state.user.photoURL} width='100px'/>
                <br />
                
        </div>
      );
    }
  }
}

render(<App />, document.getElementById('root'));
