// get todos from localStorage
let todos = localStorage.getItem("todos")

// try parse data or null
try {
	todos = JSON.parse(todos)
	todos = todos.length ? todos : null
} catch(e) {
	todos = null
}

// set default value if todos == null
if (!todos) {
	todos = [
		{content: "Shopping", status: true},
		{content: "call mom", status: true},
		{content: "check Emails", status: true},
	]
	localStorage.setItem("todos", JSON.stringify(todos))
}
//84
// func to create or update todos list in ui
function createTodos(todos) {
	let todosList = document.querySelector("#todos-list")
	todosList.innerHTML = ""

	// create list tag for each todo
	todos.forEach((todo, index) => {
		let li = document.createElement("li")
		li.className = "list-item"
		let content = document.createElement("span")
		content.textContent = todo.content
		content.style.textDecoration = todo.status ? "initial" : 'line-through' 
		let deleteBtn = document.createElement("img")
		deleteBtn.src = "../assets/delete.png"
		deleteBtn.alt = "delete icon"
		deleteBtn.className = 'float-right'

		// append content and deleteBtn to li
		li.append(content)
		li.append(deleteBtn)

		// append li to todosList
		todosList.append(li)
//85
		// add deleteBtn functionality
		deleteBtn.addEventListener("click", e => {
			todos.splice(index, 1)
			localStorage.setItem("todos", JSON.stringify(todos))
			createTodos(todos)
		})
//86
		// add complete functionality
		content.addEventListener("click", e => {
			todos[index].status = !todos[index].status
			localStorage.setItem("todos", JSON.stringify(todos))
			createTodos(todos)
		})
	});
}

createTodos(todos)

// action add & search
let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action => {
    //add todo
	if (action.dataset.action == "add") {
		action.addEventListener("click", e => {
			formWrapper.innerHTML = `
				<form id="add">
					<input class=" form-control block w-full py-1.5 px-3 text-base font-normal text-[#212529] bg-white bg-clip-padding rounded-md " name="add" placeholder="Add todo ..">
				</form>
			`
			createTodos(todos)
            let add=document.querySelector("#add")
            add.addEventListener("submit",e=>{
                e.preventDefault()
                if(add.add.value){
                    todos.push({content:add.add.value , status :true})
                    localStorage.setItem("todos", JSON.stringify(todos))
                    createTodos(todos)
                }
            })
		})
        //search todo
	} else if (action.dataset.action == "search") {
		action.addEventListener("click", e => {
			formWrapper.innerHTML = `
				<form id="search">
					<input class="form-control block w-full py-1.5 px-3 text-base font-normal text-[#212529] bg-white bg-clip-padding rounded-md" name="search" placeholder="Search todos ..">
				</form>
			`
 /*89*/           let search=document.querySelector("#search")
            search.addEventListener("keyup",e=>{
                e.preventDefault()
                if(search.search.value){
                    let filtered_todos=todos.filter(
						todo =>todo.content.toLowerCase().includes(search.search.value.toLowerCase())
					)
                   createTodos(filtered_todos)
                }
				else{
					createTodos(todos)
				}
            })
		})
	}
})