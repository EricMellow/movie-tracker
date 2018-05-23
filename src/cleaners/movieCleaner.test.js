import { mockCleanData, mockRawData } from './mockData';
import movieCleaner from "./movieCleaner";

describe('movieCleaner', () => {
  it('should take in api data and return cleaned data array', () => {
    //setup
    const expected = mockCleanData;
    //execution
    const result = movieCleaner(mockRawData);
    //expectation
    expect(expected).toEqual(result);
  });
});