import React, { Component } from 'react';

import $ from 'jquery';
import MovieForm from './MovieForm.jsx';
import Pagination from './Common/Pagination.jsx';
import { paginate } from '../utils/Paginate.js';

class Movies extends Component {
    state = {
        movies: [],
        showForm: false,
        pageSize: 4,
        currentPage:1
    }

    componentDidMount(){
    this.loadData();
}


    loadData(){
    $.ajax({
        url: "https://localhost:44350/api/Movie",
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            this.setState({ movies: data });
            console.log(this.state.movies);
        }.bind(this),
        error: function(error){
            console.log(error);
        }.bind(this)
        
    })
}
    handleDelete=(id) => {
        $.ajax({
            url: "https://localhost:44350/api/Movie/"+id,
            type: 'DELETE',
            contentType: 'text',
            success: function (response) {
                this.loadData();
            }.bind(this)
        })
    }

    handleClick = () => {
        this.setState({showForm: true})
}

    

    addMovie = (movie) => {
        //console.log("addmovie32332", movie)
        //let data = {
        //    movieName: movie.movieName, genre: movie.genre, stock: movie.stock
        //}
        //const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        //console.log(formBody);
 
        $.ajax({
            url: "https://localhost:44350/api/Movie",
            type: 'POST',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(movie),  
            success: function (response) {
                this.loadData();
                this.setState({ showForm: false });
                console.log(response);
            }.bind(this),
            error: function (error) {
                console.log("errtttttor",error);
            }.bind(this)
        })
        //fetch('https://localhost:44350/api/Movie', {
        //    method: "POST",
        //    headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //    body: formBody
        //}).then(response => {
        //    console.log('success', response);
        //})
        //    .catch(error => {
        //        console.log('error', error);
        //    })
    }

    handlePageChange = (page) => {

        this.setState({ currentPage:page })

    }

    render() {
        const {showForm} = this.state
        return (
            < div >
                {showForm ? this.renderForm() : this.renderTable()}
            </div>
            )
    }


    renderForm() {
        return (
            <MovieForm handleAddMovie={this.addMovie} />
        )
    }


    renderTable() {
        
        const { movies, showForm,pageSize,currentPage } = this.state
        const pagemovies = paginate(movies, currentPage, pageSize);
        return (
            <React.Fragment>
               
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleClick}>
                    Add Movie
                                </button>

               
            <table className="table">
                <thead> 
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {pagemovies.map(item =>
                        <tr key = {item.movieId}>
                            <td>{item.movieName} </td>
                            <td>{item.genre} </td>
                            <td>{item.stock} </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={()=> this.handleDelete(item.movieId)}>
                                    Delete
                                </button>
                            </td>
                        </tr> 
                        )}
                    
                    </tbody>
                </table>
                <Pagination itemCount={movies.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}/>
                
                </React.Fragment>
        )
    }
}

export default Movies;
