import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { mockRawData, mockCleanData } from '../../cleaners/mockData';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true })
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getMovies', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = shallow(<App />, { disableLifecycleMethods: true })
    });
    it('should call fetch on the movie api', async () => {
      //setup
      window.fetch = jest.fn().mockImplementation(()=>Promise.resolve({
        status: 200,
        json: ()=>Promise.resolve(mockRawData)
      })
    )
      //execution
      await wrapper.instance().getMovies()
      //expectation
      expect(window.fetch).toHaveBeenCalled();
    });

    it('should return an error object if the response is a rejection', () => {
      
    });
  });
  


});