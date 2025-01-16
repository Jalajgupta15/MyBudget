// FINANCE MANAGER
var financeManager = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.retrievePercentage = function() {
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var computeTotal = function(type) {
        var sum = 0;
        data.records[type].forEach(function(entry) {
            sum += entry.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        records: {
            expenses: [],
            income: []
        },
        totals: {
            expenses: 0,
            income: 0
        },
        netBudget: 0,
        overallPercentage: -1
    };

    return {
        addRecord: function(type, description, value) {
            var newRecord, ID;

            if (data.records[type].length > 0) {
                ID = data.records[type][data.records[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'expenses') {
                newRecord = new Expense(ID, description, value);
            } else if (type === 'income') {
                newRecord = new Income(ID, description, value);
            }

            data.records[type].push(newRecord);

            return newRecord;
        },

        removeRecord: function(type, id) {
            var ids, index;

            ids = data.records[type].map(function(entry) {
                return entry.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.records[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            computeTotal('expenses');
            computeTotal('income');

            data.netBudget = data.totals.income - data.totals.expenses;

            if (data.totals.income > 0) {
                data.overallPercentage = Math.round((data.totals.expenses / data.totals.income) * 100);
            } else {
                data.overallPercentage = -1;
            }
        },

        calculateAllPercentages: function() {
            data.records.expenses.forEach(function(entry) {
                entry.calculatePercentage(data.totals.income);
            });
        },

        getAllPercentages: function() {
            return data.records.expenses.map(function(entry) {
                return entry.retrievePercentage();
            });
        },

        getBudgetDetails: function() {
            return {
                budget: data.netBudget,
                totalIncome: data.totals.income,
                totalExpenses: data.totals.expenses,
                percentage: data.overallPercentage
            };
        },

        debugData: function() {
            console.log(data);
        }
    };

})();

module.exports = financeManager;
