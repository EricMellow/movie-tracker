const movieCleaner = (rawData) => {
  console.log(rawData.results)
  const cleanData = rawData.results.map(movie => {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      overview: movie.overview
    };
  });
  
  return cleanData;
};

export default movieCleaner;