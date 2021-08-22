import { TAX_TABLES }   from "./taxTables";
import {PaymentStartDate, TaxTableItem} from "./models";

function _getDefaultTaxTable():TaxTableItem[]{
    const length = TAX_TABLES.length;
    return TAX_TABLES[length-1].data;
}

function _getTaxTableByYear(paymentStartDate: PaymentStartDate):TaxTableItem[]{
    const startDateTime = new Date(`"${paymentStartDate.year}-${paymentStartDate.month}-${paymentStartDate.day}"`).getTime();
    const taxTable = TAX_TABLES.filter(taxTableItem => (taxTableItem.startYearFinancial.getTime() < startDateTime) &&
                                                       (taxTableItem.endYearFinancial.getTime() > startDateTime));
    if(taxTable && taxTable.length > 0) {
        return taxTable[0].data;
    }
    return null;
}

function _getIncomeTaxByTable(annualSalary:number, taxIncomeTableData:TaxTableItem[]):number {
    if ( taxIncomeTableData && taxIncomeTableData.length > 0 ) {
        const ListTotalTax = _buildSetOfTotalStageTax(taxIncomeTableData);
        const stageIndex   = _getTaxStage(annualSalary,taxIncomeTableData);
        return _sumIncomeTax(taxIncomeTableData[stageIndex], annualSalary, stageIndex > 0 ? ListTotalTax[stageIndex - 1] : 0);
    }
}

function _sumIncomeTax(stage:TaxTableItem ,annualSalary:number , taxTotalStage:number):number {
    const taxStageAmount = Math.round((annualSalary - stage.minAmount) * stage.centsForOneDollar);
    return  Math.round((taxStageAmount + taxTotalStage) / 12);
}

function _getTaxStage(annualSalary:number,taxIncomeTableData:TaxTableItem[]):number{
    for ( let index = 0; index < taxIncomeTableData.length; index++ ) {
        if (annualSalary <= taxIncomeTableData[index].maxAmount) return index;
    }
}

function _buildSetOfTotalStageTax(taxIncomeCustomTableData:TaxTableItem[]):Array<number>{
    const taxList = [];
    let totalTaxStageAmount = 0;
    taxIncomeCustomTableData.forEach((stage) =>{
        const taxStageAmount = Math.round((stage.maxAmount - stage.minAmount) * stage.centsForOneDollar);
        if(!isNaN(taxStageAmount)) {
            totalTaxStageAmount += taxStageAmount;
            taxList.push(totalTaxStageAmount);
        }
    });
    return taxList;
}

export const getIncomeTax = (annualSalary,paymentStartDate:PaymentStartDate):number => {
    return _getIncomeTaxByTable(annualSalary,_getTaxTableByYear(paymentStartDate) || _getDefaultTaxTable());
}