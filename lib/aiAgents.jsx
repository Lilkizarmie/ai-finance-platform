import { getGeminiResponse } from "./gemini";

export const handleRevenueAnalysis = async (invoices) => {
  const prompt = `
    Analyze the following invoices and provide:
    1. Total recognized revenue
    2. Any deferred revenue
    3. A short summary of monthly trends

    Invoices: ${JSON.stringify(invoices, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};

export const handleExpenseAnalysis = async (expenses: any[]) => {
  const prompt = `
    Analyze the following expenses:
    - Highlight recurring or duplicate expenses
    - Summarize total by category
    - Flag any abnormal spending

    Expenses: ${JSON.stringify(expenses, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};

export const handleAccountingEntries = async (transactions: any[]) => {
  const prompt = `
    Based on these transactions, generate proper journal entries (double-entry bookkeeping):
    Transactions: ${JSON.stringify(transactions, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};

export const handleBankReconciliation = async (bankStatement: any[], ledger: any[]) => {
  const prompt = `
    Match the following bank transactions with the ledger.
    Identify unmatched or suspicious transactions.

    Bank Statement: ${JSON.stringify(bankStatement, null, 2)}
    Ledger: ${JSON.stringify(ledger, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};

export const generateFinancialReport = async (financials: any) => {
  const prompt = `
    Create a simple financial report (profit & loss, balance sheet) summary:
    Data: ${JSON.stringify(financials, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};

export const analyzeKPI = async (kpiData: any) => {
  const prompt = `
    Analyze the following KPIs:
    - Comment on performance
    - Suggest areas of improvement
    - Forecast potential trends

    KPI Data: ${JSON.stringify(kpiData, null, 2)}
  `;
  return await getGeminiResponse(prompt);
};
