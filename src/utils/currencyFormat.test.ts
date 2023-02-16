import { currencyFormat } from './currencyFormat';

describe(currencyFormat, () => {
  it('should transform to currency format a number', () => {
    const price = 1000;

    const formated = currencyFormat(price);

    expect(formated).toEqual('$ 1.000,00');
  });

  it('should return empty string if number is invalid', () => {
    const price = `1000av`;

    const formated = currencyFormat(Number(price));

    expect(formated).toEqual('');
  });
});
