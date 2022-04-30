import { getInterval } from 'src/utility/date/intervals';

describe('getInterval', () => {
  it('should show correctly formatted interval given 2 dates', () => {
    expect(getInterval(new Date('04/20/2022'), new Date('04/21/2022'))).toEqual('04/20/2022 - 04/21/2022');
  });

  it('should fill in the first date with present', () => {
    expect(getInterval(undefined, new Date('04/21/2022'))).toEqual('Present - 04/21/2022');
  });

  it('should fill in the last date with future', () => {
    expect(getInterval(undefined, undefined)).toEqual('Present - Future');
  });
});
