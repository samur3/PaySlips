import * as incomeTaxGenerator  from '../income-tax-generator';

describe('Income Tax Table Generator Unit Tests:',  () => {

    it('getIncomeTax should return valid income tax when tax year is null while picking the default tax table', () => {

        /* Act */
        const result = incomeTaxGenerator.getIncomeTax(120000);

        /* Assert */
        expect(result).toEqual(2456);
    });

    it('getIncomeTax should return valid income tax when supply tax year that does not exist in the tax tables list' +
        ' default tax table would be chosen', () => {

        /* Act */
        const result = incomeTaxGenerator.getIncomeTax(120000,2015);

        /* Assert */
        expect(result).toEqual(2456);
    });

    it('getIncomeTax should return valid income tax when supply tax year exist in the tax tables list' +
        'and will choose the right tax table', () => {

        /* Act */
        const result = incomeTaxGenerator.getIncomeTax(120000,2012);

        /* Assert */
        expect(result).toEqual(2696);
    });
});
