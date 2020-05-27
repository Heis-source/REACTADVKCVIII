import React, { Component } from "react";
import './login.css';
import { Link } from "react-router-dom";
import { loginUser } from "../actions/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            email: '',
            pass: ''
        };    
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/ads"); // push user to dashboard when they login
        }
    }

    inputChange = (evt) => {
        const name = evt.target.id;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.loginUser(this.state.email, this.state.pass);
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Log In</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Username</label>
                                <input type="text" className="form-control" id="email" onChange={this.inputChange} value={this.state.email} />
                                <Link to='/register'><small>I dont have account, go to register.</small></Link>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">Password</label>
                                <input type="password" className="form-control" id="pass" onChange={this.inputChange} value={this.state.pass} />
                            </div>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
    auth: state.auth,
  });

  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);