//selecionar os elementos
const clear = document.querySelector(".clear") //first item with this class name 
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

// Nome das classes
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

//variaveis
let LIST, id

//get item from localStorage
let data = localStorage.getItem("TODO")

// check if data is not empty
// if(data){
//     LIST = JSON.parse(data);
//     id = LIST.length
//     loadList(list)
// } else {
//     LIST = []
//     id = 0
// }
// //load items to the user's interface
// function loadList(array) {
//     array.forEach(function(item){
//         addToDo(item.nome, item.id, item.donen, item.trash)
//     });
// }

// mostrar data
const options = { weekday: "long", month: "short", day: "numeric" }
const today = new Date()

dateElement.innerHTML = today.toLocaleDateString('pt-br', options)

//add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) { return }

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : ""

    const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `

    const position = "beforeend"

    list.insertAdjacentHTML(position, item)

}

// adicionando itens a lista com a tecla enter
document.addEventListener("keyup", function (e) {
    if (event.keyCode == 13) {
        const toDo = input.value

        //se o input não estiver vazio
        if (toDo) {
            document.getElementById('input').value = ""
            addToDo(toDo)

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            //add item localStorage (add where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++
            
        }
    }
})

//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}

//remove to do 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
}

// criaçao de itens

list.addEventListener("click", (event) => {
    const element = event.target
    const elementJOB = element.attributes.job.value // complete ou delete

    if (elementJOB == "complete") {
        completeToDo(element)
    } else if (elementJOB == "delete") {
        removeToDo(element)
    }

    //add item localStorage (add where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST))
})

