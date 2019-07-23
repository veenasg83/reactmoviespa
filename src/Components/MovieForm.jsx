import React, { Component } from 'react';


class MovieForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            movie: { movieName: '', genre: '', stock: '' },
            errors: {}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();     
     
       
    }

    validate = () => {
        const errors = {};
        if (this.state.movie.movieName.trim() === '')
            errors.movieName = 'moviename is required';
           
        if (this.state.movie.genre.trim() === '')
            errors.genre = 'genre is required';
        if (this.state.movie.stock.trim() === '')
            errors.stock = 'stock is required';

        return Object.keys(errors).length === 0 ? null : errors;


    }

    validateProperty = ({ name, value }) => {
        if (name === 'movieName') {
            if (value.trim() === "") return 'moviename is required';
        }
        if (name === 'genre') {
            if (value.trim() === "") return 'genre is required';
        }
        if (name === 'stock') {
            if (value.trim() === "") return 'stock is required';
        }
    }

    handleChange = (e) => {

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];
        const movie = { ...this.state.movie };
        movie[e.currentTarget.name] = e.currentTarget.value;     
        this.setState({ movie,errors });
    }

    handleSave = () => {
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        console.log("save");
        console.log("save", this.state.movie);
        let data = this.state.movie;
        
        this.props.handleAddMovie(data);
    }


    render() {
        const { movie, errors } = this.state
        return (
            <div>
                <h1> Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="form-field">
                    <label htmlFor="movieName">movieName</label>
                        <input
                            type="text"
                            name="movieName"
                            value={movie.movieName}
                            onChange={this.handleChange}
                            className="form-control"
                            id="movieName" />
                        {errors.movieName && <div className="alert alert-danger">{errors.movieName}</div>}
                        </div>
                <div className="form-field">
                    <label htmlFor="genre">Genre</label>
                    <input
                            type="text"
                            name="genre"
                            value={movie.genre}
                            onChange={this.handleChange}
                        className="form-control"
                            id="genre" />
                        {errors.genre && <div className="alert alert-danger">{errors.genre}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="stock">Stock</label>
                        <input
                            type="text"
                            name="stock"
                            value={movie.stock}
                            onChange={this.handleChange}
                            className="form-control"
                            id="stock" />
                        {errors.stock && <div className="alert alert-danger">{errors.stock}</div>}
                </div>
                    <button className="btn btn-primary" onClick={this.handleSave}>Submit</button>
                </form>


            </div>
            
            )
    }
}
export default MovieForm;
