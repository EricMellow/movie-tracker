import React, { Component } from "react";
import './Card.css';
import { connect } from 'react-redux';
import { setSelectedMovieId } from '../../actions/index';

export class Card extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = () => {
    const id = this.props.id;
    this.props.storeSelectedMovieId(id);

  }

  render() {
    const cardClass = this.props.selectedMovieId === this.props.id ? "movieCard selected" : "movieCard"
    const img = `https://image.tmdb.org/t/p/w500/${this.props.backdrop}`;
    return (
      <div
        className={cardClass}
        onClick={this.clickHandler}
      >
        <img src={img} />
        <div>
          <h3>{this.props.title}</h3>
          <p>Rating: {this.props.rating}</p>
        </div>
        <img src={ require('../Card/arrow-inactive.png')} className="arrow" />

      </div>
    );
  }
};

const mapStateToProps = (state)=>({
  selectedMovieId: state.selectedMovieId
});

const mapDispatchToProps = (dispatch) => ({
  storeSelectedMovieId: (id) => dispatch(setSelectedMovieId(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(Card);