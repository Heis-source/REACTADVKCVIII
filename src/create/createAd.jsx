import React, { Component } from "react";
import './create.css';
import Tags from "../ads/tags.jsx";
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '',
            price: '',
            photo: '',
            description: '',
            tags: []
        };
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = async (evt) => {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
        await axios.post('http://34.89.93.186:8080/apiv1/anuncios', { 
            name: this.state.name,
            photo: this.state.photo,
            description: this.state.description,
            tags: this.state.tags,
            price: parseInt(this.state.price),
            type: this.state.type
         })
        .then(response => {
            this.props.history.push('/ads');
        })
        .catch(error => {
            alert("Oppps! You 'Add' doesn't 'Add'. hehehe ");
            this.props.history.push('/create');
        })
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Creating Add</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" onChange={this.inputChange} value={this.state.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" name="price" onChange={this.inputChange}  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input className="form-control" type='text' name="description" onChange={this.inputChange}  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo">Photo</label>
                                <input className="form-control" type='text' name="photo" onChange={this.inputChange}  />
                            </div>
                            <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Tags</span>
                            </div>
                            <select name='tags' onChange={this.inputChange} value={this.state.tags} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                <Tags />
                            </select>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Sell or buy?</span>
                                </div>
                                <select onChange={this.inputChange} name="type" className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                    <option value='sell'>Sell</option>
                                    <option value='buy'>Buy</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" >Create Add</button>
                        </form>
                    </div>
                </div> 
            </div>
        );
    }
}