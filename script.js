
let id = 0; 
function handleSubmit(event) {
    event.preventDefault();
    id++;
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    let expense = {
        id: id,
        amount: amount,
        description: description,
        category: category,
    };
    localStorage.setItem(id, JSON.stringify(expense));
    renderExpense(expense);
}
function renderExpense(expense) {
    const users = document.querySelector('.list-group');
    const newLi = document.createElement('li');
    newLi.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.className = "btn btn-danger";
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.className = "btn btn-primary";
    editBtn.id="edit";
    delBtn.id="del";
    users.id="list"
    newLi.id="newLi";
    delBtn.addEventListener('click', () => {
        localStorage.removeItem(expense.id);
        users.removeChild(newLi); 
    });
    editBtn.addEventListener('click', () => {
        const amountInput = document.querySelector('#amount');
        const descriptionInput = document.querySelector('#description');
        const categoryInput = document.querySelector('#category');
        amountInput.value = expense.amount;
        descriptionInput.value = expense.description;
        categoryInput.value = expense.category;
        localStorage.removeItem(expense.id);
        users.removeChild(newLi);
    });
    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);
    newLi.className = "newLi";
    users.appendChild(newLi);
    amount.value="";
    description.value="";
    category.value="";
}
function loadExpenses() {
    let maxId = 0; 
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const expense = JSON.parse(localStorage.getItem(key));
            if (expense && expense.id) {
                renderExpense(expense); 
                maxId = Math.max(maxId, expense.id); 
            }
        }
    }
    id = maxId; 
}
loadExpenses();

