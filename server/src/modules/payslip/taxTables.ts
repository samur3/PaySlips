import {TaxTable} from "./models";

export const TAX_TABLES:Array<TaxTable> = [
    {
        startYearFinancial: new Date("2012-07-01"),
        endYearFinancial: new Date("2013-07-01"),
        data: [
            {"minAmount": 0, "maxAmount": 18200, "centsForOneDollar": 0},
            {"minAmount": 18201, "maxAmount": 37000, "centsForOneDollar": 0.19},
            {"minAmount": 37001, "maxAmount": 80000, "centsForOneDollar": 0.325},
            {"minAmount": 80001, "maxAmount": 180000, "centsForOneDollar": 0.37},
            {"minAmount": 180001, "maxAmount": Infinity, "centsForOneDollar": 0.45}
        ]
    },
    {
        startYearFinancial: new Date("2021-07-01"),
        endYearFinancial: new Date("2022-07-01"),
        data: [
            {"minAmount": 0, "maxAmount": 18200, "centsForOneDollar": 0},
            {"minAmount": 18201, "maxAmount": 45000, "centsForOneDollar": 0.19},
            {"minAmount": 45001, "maxAmount": 120000, "centsForOneDollar": 0.325},
            {"minAmount": 120001, "maxAmount": 180000, "centsForOneDollar": 0.37},
            {"minAmount": 180001, "maxAmount": Infinity, "centsForOneDollar": 0.45}
        ]
    }
];