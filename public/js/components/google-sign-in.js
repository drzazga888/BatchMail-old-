import React from 'react';
import $ from 'jquery';

export default class GoogleSignIn extends React.Component {

    constructor(props) {
        super(props);
        this.gAuth = null;
        this.initialState = {
            message: 'Please log in',
            identity: null
        };
        this.state = this.initialState;
    }

    componentDidMount() {
        var reactThis = this;
        $(document).on('google-apis-loaded', function() {
            gapi.load('client:auth2', function() {
                gapi.client.setApiKey(reactThis.props.apiKey);
                reactThis.gAuth = gapi.auth2.init({
                    client_id: reactThis.props.client,
                    //fetch_basic_profile: false,
                    scope: 'profile'
                }).then(function () {
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                    signinButton.addEventListener("click", handleSigninClick);
                });
                gapi.signin2.render('google-sign-in-button', {
                    theme: 'dark',
                    onSuccess: function(googleUser) {
                        console.log('loaded!');
                        var profile = googleUser.getBasicProfile();
                        localStorage.setItem('token', googleUser.getAuthResponse().id_token);
                        reactThis.setState({
                            message: 'Logged in',
                            identity: profile.getName() + ' (' + profile.getEmail() + ')'
                        });
                        $(document).trigger('google-logged-in');
                    },
                    onFailure: function() {
                        console.log('err-loaded!');
                        reactThis.setState({
                            message: 'Error while authenticating',
                            identity: null
                        });
                    }
                });
            });
        });
    }

    logOut() {
        this.gAuth.signOut();
        localStorage.removeItem('token');
        this.setState(this.initialState);
        $(document).trigger('google-logged-out');
    }

    render() {
        return (
            <div className="inline-wrapper">
                <p className="inline-element">
                    {this.state.message} -
                    {this.state.identity ? <em>{this.state.identity}</em> : <em>You're a guest</em>}
                </p>
                {this.state.identity ? <button className="inline-element" onClick={this.logOut.bind(this)}>Log out</button> : null}
                <div className="inline-element">
                    <div id="google-sign-in-button"></div>
                </div>
            </div>
        );
    }

};
