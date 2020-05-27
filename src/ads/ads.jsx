import React, { Component } from "react";
import Tags from "./tags.jsx";
import makingURL from './makingurl.js';
import './ads.css'
import { Link } from "react-router-dom";
import { adsNoFilter } from "../actions/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Ads extends Component {
    constructor(props) {
        super()
        this.state = {
            data: [],
            name: '',
            sell: '',
            pricemin: 0,
            pricemax: 0,
            tags: null
        };
    }

    /*search = (filter) => {
        axios.defaults.withCredentials = true;
        axios.get('http://34.89.93.186:8080/apiv1/anuncios' + filter)
        .then(response => {
            const data = response.data.results;
            this.setState({ data });
        })
        .catch(error => {
            alert("You Shall Not Pass! Log in first!");
            this.props.history.push('/login');
        })
    }*/
    
    onSubmit = (evt) => {
        evt.preventDefault();

        const finalURL = makingURL([this.state.name], [this.state.sell], [this.state.pricemin], [this.state.pricemax], [this.state.tags]);
        this.props.addNoFilter(finalURL.toString());

    }

    onChangeInput = (evt) => {
        let inputValue = evt.target.value;
        let inputName = evt.target.name;
        this.setState({ [inputName]: inputValue});
    }

    render() {
        const { data } = this.state;
        const renderAds = data.map((d) =>
        <div className="card mb-3" key={d._id}>
        <div className="row no-gutters">
            <div className="col-md-4">
                <img src={d.photo} className="card-img" alt={d.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <p className="card-text">{d.description}</p>
                        <p className="card-text">Price: <span>{d.price}</span></p>
                        <p className="card-text">Tags: <span>{d.tags}</span></p>
                        <p className="card-text">Type: <span>{d.type}</span></p>
                    </div>
                    <div className="col-auto my-1">
                       <Link to={`/details/${d._id}`}><button className="btn btn-primary">I want to see more</button></Link>
                       <Link to={`/edit/${d._id}`}><button className="btn btn-warning">Edit</button></Link>
                    </div>
                </div>
            </div>
        </div>
        );
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card bg-light mb-3 styled-card" >
                    <div className="card-header">Filters! Filters!</div>
                    <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" name='name' onChange={this.onChangeInput} value={this.state.name} placeholder='Name...' className="form-control" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Price</span>
                        </div>
                        <input type="number" name='pricemin' onChange={this.onChangeInput} className="form-control" placeholder="Min" aria-describedby="basic-addon1" />
                        <input type="number" name='pricemax' onChange={this.onChangeInput} className="form-control" placeholder="Max" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Tags</span>
                        </div>
                        <select name='tags' onChange={this.onChangeInput} value={this.state.tags} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <Tags />
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Sell or buy?</span>
                        </div>
                        <select onChange={this.onChangeInput} value={this.state.sell} name="sell" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option value='null'>All</option>
                            <option value='true'>Sell</option>
                            <option value='false'>Buy</option>
                        </select>
                    </div>
                    <div className="col-auto my-1">
                        <button type="submit" className="btn btn-primary">Filter</button>
                        <Link to={`/login`}><button className="btn btn-danger margin-button">Go back</button></Link>
                    </div>
                </form>
                    </div>
                </div>
                {renderAds}
            </div>
        );
    }
}

Ads.propTypes = {
    adsNoFilter: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
    auth: state.auth,
  });

  export default connect(
    mapStateToProps,
    { adsNoFilter }
  )(Ads);