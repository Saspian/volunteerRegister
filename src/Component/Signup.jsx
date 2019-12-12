import React, {useState} from 'react';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css'

const SignupForm = () => {

    const [volunteers, setVolunteers] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
        repassword: ''
    })

    const showNotification = () => {
        new Noty({
            type: 'success',
            theme: 'mint',
            layout: 'topCenter',
            text: 'Added successfull',
            buttons: [
                Noty.button('Ok', 'btn btn-success btn-block', ()=>{
                    window.location = "/signup";
                } )
            ]
        }).show();
    };
    const showEmailError = () => {
        new Noty({
            type: "error",
            theme: 'mint',
            layout: 'topCenter',
            text: 'Email already exist',
            timeout: 2000
        }).show();
    };
    const passwordError = () => {
        new Noty({
            type: "error",
            theme: 'mint',
            layout: 'topCenter',
            text: 'password doesnt match',
            timeout: 2000
        }).show();
    };
    const sameError = () => {
        new Noty({
            type: "error",
            theme: 'mint',
            layout: 'topCenter',
            text: 'something is wrong',
            timeout: 2000
        }).show();
    }

    const changeHandler = e => {
        setVolunteers({...volunteers, [e.target.name] : e.target.value});
    }

    const addVolunteer = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/user/register',volunteers)
        .then(response => {
            console.log(response);
            showNotification();
        })
        .catch(error => {
            if(error.response.data.emailError) {
                showEmailError();
            }
            if(error.response.data.pwdError) {
                passwordError();
            }
            if(error.response.data.errmsg){
                sameError();
            }
        })
        
    }

    const reset = e => {
        e.preventDefault();
        setVolunteers({...volunteers,
        name: '',
        contact: '',
        email: '',
        password: '',
        repassword: ''
    });
    }
    return(
        <div className="container">
            <h1>Sign up form for Volunteer</h1>
            <hr />
            <form onSubmit={addVolunteer}>
                <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" onChange={changeHandler} required="required"/>
                </div>
                <div className="form-group">
                <label>Contact number</label>
                <input type="number" name="contact" className="form-control" placeholder="98XXXXXXXX" onChange={changeHandler} required="required"/>
                </div>
                <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-control" placeholder="name@example.com" onChange={changeHandler} required="required"/>
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" onChange={changeHandler} required="required"/>
                </div>
                <div className="form-group">
                <label>Repeat Password</label>
                <input type="password" name="repassword" className="form-control" onChange={changeHandler} required="required"/>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up</button>
                <button type="button" onClick={reset} className="btn btn-secondary btn-lg btn-block">Reset</button>
            </form>
        </div>
    )
}
export default SignupForm;