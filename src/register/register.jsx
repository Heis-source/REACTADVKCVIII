import React, { Component } from "react";
import './register.css';
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../actions/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Register extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            pass: ''
        };    
    }

    inputChange = (evt) => {
        const name = evt.target.id;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = evt => {
        evt.preventDefault();
           
        this.props.registerUser(this.state.email, this.state.pass, this.props.history); 
    
    };

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div class="card border-dark mb-3 border-card">
                    <div class="card-header">Creating a new user</div>
                    <div class="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="email">Username</label>
                                <input type="text" class="form-control" id="email" onChange={this.inputChange} value={this.state.email} />
                                <Link to='/login'><small>I have account, i want to log on.</small></Link>
                            </div>
                            <div class="form-group">
                                <label for="pass">Password</label>
                                <input type="password" class="form-control" id="pass" onChange={this.inputChange} value={this.state.pass} />
                            </div>
                            <button type="submit" class="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
    auth: state.auth,
});
  
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));