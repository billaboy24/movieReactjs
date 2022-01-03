import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import MovieTable from './moviesTable';
import Pagination from './commons/pagination';
import {paginate} from './utils/pagination';
import ListGroup from './commons/listGroup';
import {getGenres} from '../services/fakeGenreService'
import _ from 'lodash';

import { Link } from 'react-router-dom';
import SearchBox from './commons/searchBox';

class Movies extends Component {
    state ={
        movies:[],
        genres:[],
        currentPage:1,
        pageSize:4,
        selectedGenre:null,
        searchQuery:"",
        sortColumn:{path:'title',order:'asc'}
    };

    componentDidMount(){
        const genres =[{_id:'',name:"All Genres"},...getGenres()]
        this.setState({movies:getMovies(),genres});
    }

    handleDelete =(movie)=>{
        const movies = this.state.movies.filter(m=> m._id !== movie._id);
        this.setState({movies});

    }

    handleLike =(movie)=>{
        const movies =[...this.state.movies];
        const index =movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange=(page)=>{
        this.setState({currentPage:page})
    }

    handleGenreSelect =(genre)=>{
        this.setState({selectedGenre:genre,searchQuery:"" ,currentPage:1});

    }

    handleSort=(sortColumn)=>{
        
this.setState({sortColumn});
    }

    handleQuery=query=>{
        this.setState({searchQuery:query,selectedGenre:null,currentPage:1})
    }

    getPagedData =()=>{
        const {pageSize,currentPage,movies:allMovies,selectedGenre,searchQuery,sortColumn}=this.state
        let filtered=allMovies;
        if(searchQuery)
        filtered=allMovies.filter
        (m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));

        
        else if (selectedGenre && selectedGenre._id )
        filtered=allMovies.filter(m=>m.genre._id ===selectedGenre._id);

        const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order])


        const movies=paginate(sorted,currentPage,pageSize);

        return{totalCount:filtered.length, data:movies};

    }
    render() { 
        const {pageSize,currentPage,sortColumn,searchQuery}=this.state

        if(this.state.movies.length === 0) return <p>There is no movies in database</p>;

        const {totalCount,data:movies}=this.getPagedData();

      

        return (
            <div className='row'>

                <div className="col-2">
                   
                    <ListGroup items={this.state.genres} 
                    selectedItem={this.state.selectedGenre}
                    onSelectItem={this.handleGenreSelect}/>

                </div>

                <div className="col">
                    <Link to='/movies/new' className='btn btn-primary' style={{marginBottom:20}}>
                    New Movie
                    </Link>

            <p>Showing {totalCount} movies in the database.</p>
            <SearchBox value={searchQuery} onChange={this.handleQuery}/>
            <MovieTable 
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}/>
            
            <Pagination 
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanges={this.handlePageChange} />
                </div>

            </div>
         ) }
}
 
export default Movies;