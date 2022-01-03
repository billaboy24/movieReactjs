import React from 'react';
import Joi  from 'joi-browser';
import Form from './commons/form';

class Register extends Form {
    state={
        data:{username:'',password:'',email:''},
        errors:{}
    }
    schema={
        username:Joi.string().required().label('Username'),
        password:Joi.string().required().min(5).label('Password'),
        email: Joi.string()
        .email().label('Email')

        

    };
   
    doSubmit=()=>{
        //Call the server
        console.log("Submitted")
    }

    
    
    render() { 
        
        return <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
            {this.rendenInput("email","Email")}
             {this.rendenInput("username","Username")}

             {this.rendenInput("password","Password","password")}

             

                

               {this.renderButton("Register")}
            </form>
        </div>;
    }
}
 
export default Register;

