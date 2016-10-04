import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ProjectList from './components/project-list';
import GoogleSignIn from './components/google-sign-in';
import ProjectForm from './components/project-form';

$(document).ready(function(){

    ReactDOM.render(
        <ProjectList url="/api/project/" />,
        $('#project-list')[0]
    );

    ReactDOM.render(
        <ProjectForm docsUrl="/api/google-docs/"/>,
        $('#project-form')[0]
    );

    ReactDOM.render(
        <GoogleSignIn client="570516870447-p8q7b2blehn7poshv16f55kncb700ml8.apps.googleusercontent.com" />,
        $('#google-signin')[0]
    );

});
