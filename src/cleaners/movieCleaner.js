const movieCleaner = (rawData) => {
  const movieData = rawData.results;
  
  const cleanData = movieData.map(movie => {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      overview: movie.overview,
      rating: movie.vote_average,
      release: movie.release_date
    };
  });

  return cleanData;
};

export default movieCleaner;