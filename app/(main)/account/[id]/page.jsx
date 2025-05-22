import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  // Calculate account statistics
  const calculateStats = () => {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startOfMonth;
    });

    const income = currentMonthTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = currentMonthTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    const previousMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate < startOfMonth && 
             transactionDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    });

    const previousIncome = previousMonthTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const previousExpenses = previousMonthTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      incomeChange: previousIncome ? ((income - previousIncome) / previousIncome) * 100 : 0,
      expensesChange: previousExpenses ? ((expenses - previousExpenses) / previousExpenses) * 100 : 0,
      lastTransaction: transactions[0] ? new Date(transactions[0].date) : null
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-8 px-5">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl sm:text-4xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.income.toFixed(2)}</div>
            <div className="flex items-center text-xs">
              {stats.incomeChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "ml-1",
                stats.incomeChange >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {Math.abs(stats.incomeChange).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.expenses.toFixed(2)}</div>
            <div className="flex items-center text-xs">
              {stats.expensesChange <= 0 ? (
                <ArrowDownRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "ml-1",
                stats.expensesChange <= 0 ? "text-green-500" : "text-red-500"
              )}>
                {Math.abs(stats.expensesChange).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(stats.income - stats.expenses).toFixed(2)}
            </div>
            <div className="flex items-center text-xs">
              <span className={cn(
                (stats.income - stats.expenses) >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {((stats.income - stats.expenses) / stats.income * 100).toFixed(1)}% of income
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Transaction</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.lastTransaction ? format(stats.lastTransaction, 'MMM d') : 'N/A'}
            </div>
            <div className="text-xs text-muted-foreground">
              {stats.lastTransaction ? format(stats.lastTransaction, 'yyyy') : ''}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#32AE4C" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#32AE4C" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
