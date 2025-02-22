function handleSubmit(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const category = event.target.category.value;
    const description = event.target.description.value;
    let expense = {
        amount: amount,
        category: category,
        description: description
    };
    axios
        .post(
            "http://localhost:3001/expense/add-expense",
            expense
        )
        .then((response) => {renderDetails(response.data.newExpenseDetail)
    console.log(response.data)})
        .catch((error) => console.log(error));
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "";
        
}

function renderDetails(details) {
    console.log(details)
    const id = details.id;
    const users = document.querySelector('.list-group');
    const newLi = document.createElement('li');
    newLi.textContent = `${details.amount} - ${details.category} - ${details.description}`;
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.id="edit"
    const deleteBtn = document.createElement('button');
   deleteBtn.innerHTML = 'Delete';
    deleteBtn.id="edit"
    editBtn.className = "btn btn-primary";
    deleteBtn.className = "btn btn-primary";
    users.id = "list";
    newLi.id = "newLi";
    editBtn.addEventListener('click', () => {
         axios.get(`http://localhost:3001/expense/get-ExpensebyId/${id}`)
         .then((response)=>{
            document.getElementById("amount").value = response.data.amount;
            document.getElementById("category").value = response.data.category;
            document.getElementById("description").value = response.data.description;
            return axios.delete(`http://localhost:3001/expense/delete-expense/${id}`)
         })
         .then((response)=>{
            console.log("Deleted");
        users.removeChild(newLi);
         })
        .catch((err)=>{
            console.log(err);
        })
    });
    deleteBtn.addEventListener('click', ()=>{
     axios.delete(`http://localhost:3001/expense/delete-expense/${id}`)
     .then((response)=>{
        console.log("Deleted");
        users.removeChild(newLi);
     })
     .catch((err)=>{
console.log(err);
     })
    })
    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);
    newLi.className = "newLi";
    users.appendChild(newLi);
}

window.addEventListener("DOMContentLoaded", () => {
console.log("loaded")
    axios.get("http://localhost:3001/expense/get-expense")
        .then((response) => {
            console.log("called")
            console.log(response.data.allUsers)
            for (var i = 0; i < response.data.allUsers.length; i++) {
                renderDetails(response.data.allUsers[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });   
});


