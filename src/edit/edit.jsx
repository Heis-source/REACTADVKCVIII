import React, { Component } from "react";
import './edit.css'
import Tags from "../ads/tags.jsx";
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount = () => {
        this.search(this.props.match.params.id);
    }   
    
    search = (filter) => {
        axios.defaults.withCredentials = true;
        axios.get('http://34.89.93.186:8080/apiv1/anuncios/' + filter)
        .then(response => {
            const data = response.data.result;
            this.setState({ data });
        })
        .catch(error => {
            alert("Oppps! You 'Add' doesn't 'Add'. hehehe ");
            this.props.history.push('/create');
        })
    }

    inputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
        axios.put('http://34.89.93.186:8080/apiv1/anuncios', { 

         })
        .then(response => {
            this.props.history.push('/ads');
        })
        .catch(error => {
            alert("Not edited, try AGAIN");
            this.props.history.push(this.search(this.props.match.params.id));
        })
    }

    render() {
        const { data } = this.state;
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                    <div className="card-header">Update Add</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" onChange={this.inputChange} placeholder={data.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" name="price" onChange={this.inputChange} placeholder={data.price} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input className="form-control" type='text' name="description" onChange={this.inputChange} placeholder={data.description} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo">Photo</label>
                                <input className="form-control" type='text' name="photo" onChange={this.inputChange} placeholder={data.photo} />
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
                                    <option key={1} value='sell'>Sell</option>
                                    <option key={2} value='buy'>Buy</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" >Update Add</button>
                        </form>
                    </div>
                </div> 
            </div>         
        )
    }
}