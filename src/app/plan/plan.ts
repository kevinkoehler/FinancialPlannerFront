export interface IPlan {
    id: number;
    name: string;
    currentSavings: number;
    goalSavings: number;
    showDetails: boolean;
    calculated: boolean;
    monthlyIncomeTotal: number;
    monthlyExpensesTotal: number;
    monthlySavings: number;
    yearlyIncomeTotal: number;
    yearlyExpensesTotal: number;
    yearlySavings: number;
}
