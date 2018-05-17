import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { mockRawData, mockCleanData } from '../../cleaners/mockData';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>, { disableLifecycleMethods: true })
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getMovies', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = shallow(<App />, { disableLifecycleMethods: true })
    });

    it('should call fetch on the movie api', () => {
      window.fetch = jest.fn().mockImplementation(()=>Promise.resolve({
        status: 200,
        json: ()=>Promise.resolve(mockRawData)
      })
      );

      wrapper.instance().getMovies();

      expect(window.fetch).toHaveBeenCalled();
    });

    it.skip('should return an error object if the response is a rejection', () => {
      
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('test rejection'))
      )
      const expected = [{
        id: 0,
        title: "Oh No!",
        poster: "Error",
        backdrop: "Error",
        overview: "We encountered an error and couldn't retreive your data"
      }];
     
      wrapper.instance().props.setRecentMovies = jest.fn()
      wrapper.instance().getMovies();

      expect(wrapper.instance().props.setRecentMovies).toHaveBeenCalledWith(expected);

    });

    it.skip('should return an error object if the response status is not 200', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 408,
        json: () => Promise.resolve(mockRawData)
      })
      );

      const expected = [{
        id: 0,
        title: "Oh No!",
        poster: "Error",
        backdrop: "Error",
        overview: "We encountered an error and couldn't retreive your data"
      }];

      wrapper.instance().props.setRecentMovies = jest.fn();
      wrapper.instance().getMovies();

      expect(wrapper.instance().props.setRecentMovies).toHaveBeenCalledWith(expected);
    });
  });

  it('should call dispatch with the correct params on setRecentMovies', () => {
    const mockDispatch = jest.fn();
    const mappedProps = mapDispatchToProps(mockDispatch);
    const mockAction = {
      type: 'ADD_RECENT_MOVIES',
      recentMovieData: mockCleanData
    };
    mappedProps.setRecentMovies(mockCleanData);

    expect(mockDispatch).toHaveBeenCalledWith(mockAction);

  });
  


});