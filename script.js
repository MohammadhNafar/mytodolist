const input = document.getElementById('input');
const editIndex = document.getElementById('edit-index');
const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const toast = document.getElementById('myToast');
const closeToast = document.getElementById('closeToast');
const deleteToast = document.getElementById('deleteToast');





const inputTitle = document.getElementById('input-title');
const inputDate = document.getElementById('input-date');
const inputDec = document.getElementById('input-dec');


function getTodos() {
    return fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos')
        .then(data => {
            return  data.json()
        })
        .then( result=> {
            return result
        })
}

//


function getTodo(i) {
   return  fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${i}`)
        .then(data => {
            return  data.json()
        })
        .then(result => {
            return result
             console.log(result)
        })
}



// POST TODO function

function addTodo({title,description,dueDate,checked}) {
    return  fetch('https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: inputTitle.value,
            description: inputDec.value ,
            dueDate: inputDate.value,
            checked: false,
            createdAt: (new Date()).toString(),
            updatedAt: (new Date()).toString(),
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            allData.push(result);
            refreshList(allData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


getTodos().then(data => {
    console.log(data)
    refreshList(data)
})

function addValue() {
    if (addBtn.innerText == "Save")
    {
        update();


    }
    else
    {
        toast.style.display = "block";

    addTodo({
        title: inputTitle.value,
        description:inputDec.value,
        dueDate: inputDate.value,
        checked: false
        
    })

        .then(() => {
            getTodos()
            
            
            },
            inputDec.value = " ",
            inputTitle.value = " ",
            inputDate.value = " ",
            inputDate.placeholder = "date...",
            inputDec.placeholder = "description...",
            inputTitle.placeholder = "title..."
           
        )
    }
    
}


function deleteValue(index)
{
    console.log(index);
    let delData = allData.filter(item=>item.id == index)
      fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${index}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
       
    })
    
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            document.getElementById("item-"+result.id).remove();
            deleteToast.style.display = "block";
            
            
        })
        .catch(error => {
            console.error('Error:', error);
        });


};




 let tempEditId;

function editTodo(getId) {
    let tempData = allData.filter(item=>item.id == getId);
    inputTitle.value = tempData[0].title;
    inputDate.value = tempData[0].dueDate;
    inputDec.value = tempData[0].description;
    addBtn.innerText = 'Save';
    tempEditId = tempData[0].id;

    

    
    
}


function update() {
    return  fetch(`https://60b77f8f17d1dc0017b8a2c4.mockapi.io/todos/${tempEditId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: inputTitle.value,
            description: inputDec.value ,
            dueDate: inputDate.value,
            checked: allData.filter(item=>item.id==tempEditId)[0].checked,
            createdAt: allData.filter(item=>item.id==tempEditId)[0].createdAt,
            updatedAt: (new Date()).toString()
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}








function closetst()
{
    toast.style.display = "none";
}

function closeDelete()
{
    deleteToast.style.display = "none";
}












let allData;






function refreshList(data) {
    allData = data;
    todoList.innerHTML = "";
    const output = data.map(function (item, index) {
        console.log(item);
        return `
        <hr>
        <li id="item-${item.id}" style="display: flex;justify-content-between;padding: 16px;align-items: center ;gap : 10%;">
        <div style="display: flex;align-items: center ; width:60%;">
        <input onchange="toggleTodo(${index})" type="checkbox" ${isDone(item) ? 'checked' : ''}>
        <div style="margin-left:0.5rem" class="${isDone(item) ? 'done' : ''}">${item.title}</div>
        </div>
        <div style="margin-right:5rem" class="${isDone(item) ? 'done' : ''}">${item.description}</div>
        </div>
        <div style="margin-left:10rem" class="${isDone(item) ? 'done' : ''}">${item.dueDate}</div>
        </div>
        <div style="width:50%;">
        <button onclick="editTodo(${item.id})" class="fa fa-edit" style="color:green ;border:none"></button>
        <button onclick="deleteValue(${item.id})" class="fa fa-trash" style="color:red;border:none"></button>
        </div>
         </li>

        `
        
    })

    todoList.innerHTML = output.reverse().join('');
    
};





function getItemValue(item) {
    return item;
}

function isDone(item) {
    return item.done;
}

 function toggleTodo(item) {
            
            
            item.done = !item.done;
           
            this.setItems(items);
        };












