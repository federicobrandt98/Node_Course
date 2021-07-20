const lib = require('../exercise1');

describe('fizzBuzz', () =>{
    it('should throw if input is not a number', () => {
        expect(() => { lib('Fede') }).toThrow();
        expect(() => { lib(null) }).toThrow();
        expect(() => { lib(undefined) }).toThrow();
        expect(() => { lib('') }).toThrow();
        expect(() => { lib({}) }).toThrow();
    });
    it('should return FizzBuzz if number div by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });
    it('shoudl return Fizz if number div by 3', () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });
    it('should return Buzz if number div by 5', () => {
        const result = lib.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
    it('should return input if neither div by 3 or 5', () => {
        const result = lib.fizzBuzz(7);
        expect(result).toBe(7);
    });
});