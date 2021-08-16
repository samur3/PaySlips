import { TAX_TABLES }   from "./taxTables";
import { TaxTableItem } from "./models";

function _getDefaultTaxTable():Array<TaxTableItem>{
    const length = TAX_TABLES.length;
    return TAX_TABLES[length-1].data;
}

function _getTaxTableByYear(taxTableYear):Array<TaxTableItem> | null{
    if(!taxTableYear) return null;
    const taxTable = TAX_TABLES.filter(taxTableItem => taxTableItem.year === taxTableYear.toString());
    if(taxTable && taxTable.length > 0) {
        return taxTable[0].data;
    }
    return null;
}

function _getIncomeTaxByTable(annualSalary, taxIncomeTable):number {
    if ( taxIncomeTable && taxIncomeTable.length > 0 ) {
        const ListTotalTax = _buildSetOfTotalStageTax(taxIncomeTable);
        const stageIndex   = _getTaxStage(annualSalary,taxIncomeTable);
        return _sumIncomeTax(taxIncomeTable[stageIndex], annualSalary, stageIndex > 0 ? ListTotalTax[stageIndex - 1] : 0);
    }
}

function _getTaxStage(annualSalary,taxIncomeTable):number{
    for ( let index = 0; index < taxIncomeTable.length; index++ ) {
        if (annualSalary <= taxIncomeTable[index].maxAmount) return index;
    }
}

function _buildSetOfTotalStageTax(taxIncomeCustomTable):Array<number>{
    const taxList = [];
    let totalTaxStageAmount = 0;
    taxIncomeCustomTable.forEach((stage) =>{
        const taxStageAmount = Math.round((stage.maxAmount - stage.minAmount) * stage.centsForOneDollar);
        if(!isNaN(taxStageAmount)) {
            totalTaxStageAmount += taxStageAmount;
            taxList.push(totalTaxStageAmount);
        }
    });
    return taxList;
}

function _sumIncomeTax(stage ,annualSalary , taxTotalStage):number {
    const taxStageAmount = Math.round((annualSalary - stage.minAmount) * stage.centsForOneDollar);
    return  Math.round((taxStageAmount + taxTotalStage) / 12);
}

export const getIncomeTax = (annualSalary,taxTableYear = null ):number => {
    return _getIncomeTaxByTable(annualSalary,_getTaxTableByYear(taxTableYear) || _getDefaultTaxTable());
}