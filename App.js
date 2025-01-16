document.querySelector('.add__btn').addEventListener('click', function () {
    const type = document.querySelector('.add__type').value; // + or -
    const description = document.querySelector('.add__description').value;
    const value = parseFloat(document.querySelector('.add__value').value);

    if (description !== "" && !isNaN(value) && value > 0) {
        addItem(type, description, value);
        clearFields();
    }
});

function addItem(type, description, value) {
    const container = type === 'inc' ? '.income__list' : '.expenses__list';
    const html = `
        <div class="item clearfix">
            <div class="item__description">${description}</div>
            <div class="right clearfix">
                <div class="item__value">${type === 'inc' ? '+' : '-'} ${value.toFixed(2)}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
    `;
    document.querySelector(container).insertAdjacentHTML('beforeend', html);
}

function clearFields() {
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
    document.querySelector('.add__description').focus();
}
