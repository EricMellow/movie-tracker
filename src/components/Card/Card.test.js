import React from 'react';
import { Card, mapStateToProps, mapDispatchToProps } from "./Card";
import { shallow } from 'enzyme';

describe('Card', () => {
  let wrapper;
  let mockStoreSelectedMovieId;

  beforeEach(() => {
    mockStoreSelectedMovieId = jest.fn();

    wrapper = shallow(<Card storeSelectedMovieId={mockStoreSelectedMovieId} /> );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('clickHandler', () => {
    it('should call storeSelectedMovieId', () => {
      wrapper.instance().clickHandler();

      expect(wrapper.instance().props.storeSelectedMovieId).toHaveBeenCalled();
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on storeSelectedMovieId', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SET_SELECTED_MOVIE_ID',
        movieId: 182935
      };
      
      mappedProps.storeSelectedMovieId(182935);
  
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });

  describe('mapStateToProps', () => {
    it('should map selectedMovieId to props', () => {
      const state = {
        selectedMovieId: 12345
      };
      const expected = {
        selectedMovieId: 12345
      };
      const mappedProps = mapStateToProps(state);
      
      expect(mappedProps).toEqual(expected);
    });
  });
});