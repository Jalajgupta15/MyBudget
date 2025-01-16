const financeManager = require('./FinanceController');
const UIController = require('./UIController');

// MAIN APPLICATION CONTROLLER
var appController = (function(financeCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', addItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', deleteItem);
    };

    var updateBudget = function() {
        financeCtrl.calculateBudget();
        UICtrl.displayBudget(financeCtrl.getBudgetDetails());
    };

    var addItem = function() {
        var input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            var newItem = financeCtrl.addRecord(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            updateBudget();
        }
    };

    var deleteItem = function(event) {
        var itemID = event.target.closest('.item').id;

        if (itemID) {
            var splitID = itemID.split('-');
            var type = splitID[0];
            var ID = parseInt(splitID[1]);

            financeCtrl.removeRecord(type, ID);
            UICtrl.deleteListItem(itemID);
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log('My Budget application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({ budget: 0, totalIncome: 0, totalExpenses: 0, percentage: -1 });
            setupEventListeners();
        }
    };

})(financeManager, UIController);

appController.init();
