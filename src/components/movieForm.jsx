import React from 'react';
import Form from './commons/form';

import Joi  from 'joi-browser';


import { saveMovie,getMovie } from './../services/fakeMovieService';
import {getGenres} from './../services/fakeGenreService';




class Movieform extends Form {
    state={
        data:{
            title:'',
            genreId:'',
            numberInStock:'',
            dailyRentalRate:''
        },
        genres:[],
        errors:[]

    };

    schema={
        _id:Joi.string(),
        title:Joi.string().required().label("Title"),
        genreId:Joi.string().required().label("Genre"),
        numberInStock:Joi.number().required().min(0).max(100).label("Number In Stock"),
        dailyRentalRate:Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
        }

    componentDidMount(){
        const genres=getGenres();
        this.setState({genres});

        const movieId=this.props.match.params.id;
        if(movieId==='new') return;

        const movie=getMovie(movieId);
        if(!movie) return this.props.history.replace('/not-found');

        this.setState({data:this.mapToViewModal(movie)});
    }

    mapToViewModal(movie){
        return {
        _id:movie._id,
        title:movie.title,
        genreId:movie.genre._id,
        numberInStock:movie.numberInStock,
        dailyRentalRate:movie.dailyRentalRate
    };

    }

    doSubmit=()=>{
        
        saveMovie(this.state.data);
        this.props.history.push("/movies")
    }




    render() { 
        return( <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
            {this.rendenInput("title","Title")}
            {this.renderSelect("genreId","Genre",this.state.genres)}
            {this.rendenInput("numberInStock","Number In Stock",'number')}
            {this.rendenInput("dailyRentalRate","Daily Rental Rate",'number')}
            {this.renderSave("Save",this.onSubmit)}
                
                
                
                
                
                </form>
            
        </div>);
    }
}
 
export default Movieform ;