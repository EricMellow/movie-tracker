import React, { Component } from "react";
import './Card.css';
import { connect } from 'react-redux';
import { setSelectedMovieId } from '../../actions/index';
import PropTypes from 'prop-types';

export class Card extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = () => {
    const id = this.props.id;
    this.props.storeSelectedMovieId(id);
  }

  render() {
    const rating = this.props.rating * 10;
    const cardClass = this.props.selectedMovieId === this.props.id ? "movieCard selected" : "movieCard";
    const img = `https://image.tmdb.org/t/p/w500/${this.props.backdrop}`;
    
    return (
      <div
        className={cardClass}
        onClick={this.clickHandler}
      >
        <img src={img} className="thumbImg"/>
        <div className="titleStars">
          <h3>{this.props.title}</h3>
          <div className="stars">
            <div>
              <img src={require('../Card/stars-gray.png')} />
            </div>
            <div className="goldStars" style={{"width" : `${rating}%`}}>
              <img src={require('../Card/stars-gold.png')}  />
            </div>
          </div>
        </div>
        <div className='triangle'></div>
      </div>
    );
  }
};

Card.propTypes = {
  storeSelectedMovieId: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.number,
  rating: PropTypes.number,
  selectedMovieId: PropTypes.number,
  backdrop: PropTypes.string
};

export const mapStateToProps = (state)=>({
  selectedMovieId: state.selectedMovieId
});

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedMovieId: (id) => dispatch(setSelectedMovieId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);