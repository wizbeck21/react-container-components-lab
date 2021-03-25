import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const BASE_URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      reviews: []
    }
  }

handleSearchInputChange = event =>
  this.setState({searchTerm: event.target.value});

handleSubmit = event => {
  event.preventDefault()
  
  fetch(BASE_URL.concat(this.state.searchTerm))
  .then(r => r.json())
  .then(data => this.setState({ reviews: data.results }))
}


render() {
  return(
    <div className="searchable-movie-reviews">
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="search-input"> Search Movie Reviews</label>
        <input
          id="search-input"
          type="text"
          style={ {width: 300 }}
          onChange={this.handleSearchInputChange}
          />
          <button type="submit">Search</button>
      </form>
      {typeof this.state.reviews === "object" && this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
      <MovieReviews reviews={this.state.reviews} />
    </div>
  );
}


}

export default SearchableMovieReviewsContainer;