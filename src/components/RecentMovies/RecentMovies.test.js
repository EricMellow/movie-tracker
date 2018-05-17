import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';
import { shallow } from 'enzyme';
import { mockRawData, mockCleanData } from '../../cleaners/mockData';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true })
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('getMovies', () => {
  //   let wrapper;
    
  //   beforeEach(() => {
  //     wrapper = shallow(<App />, { disableLifecycleMethods: true })
  //   });
  //   it('should call fetch on the movie api', async () => {
  //     //setup
  //     window.fetch = jest.fn().mockImplementation(()=>Promise.resolve({
  //       status: 200,
  //       json: ()=>Promise.resolve(mockRawData)
  //     })
  //   )
  //     //execution
  //     await wrapper.instance().getMovies()
  //     //expectation
  //     expect(window.fetch).toHaveBeenCalled();
  //   });

  //   it('should return an error object if the response is a rejection', () => {
  //     //setup
  //     window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('test rejection'))
  //     )
  //     //execution
  //     await wrapper.instance().getMovies()
  //     //expectation
  //     const expected = [{
  //       id: '00',
  //       title: 'we are sorry!',
  //       poster: '',
  //       backdrop: '',
  //       overview: 'Sorry!  We encountered an error and were unable to retrieve your data.'
  //     }]
  //     expect().toEqual(expected)
  //   });

  //   it('should return an error object if the response status is not 200', () => {
  //     //setup
  //     window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  //       status: 408,
  //       json: () => Promise.resolve(mockRawData)
  //     })
  //     )
  //     //execution
  //     await wrapper.instance().getMovies()
  //     //expectation
  //     const expected = [{
  //       id: '00',
  //       title: 'we are sorry!',
  //       poster: '',
  //       backdrop: '',
  //       overview: 'Sorry!  We encountered an error and were unable to retrieve your data.'
  //     }]
  //     expect().toEqual(expected)
  //   });
  // });
  


});