function AddTask() {
    let html = `<form>
                <input type="text" id="GetTask" placeholder="Add Task" >
                <button type="button" onclick="SaveFunction()">Save</button>
                <button type="submit" onclick="DeleteFunction()">Cancel</button>
                </form>`;
    document.getElementById("addBtn").style.display = "none";
    document.getElementById('TaskContainer').innerHTML = html;
}

function SaveFunction() {
    let get = document.getElementById('GetTask').value;
    if (!get) {
        alert("Enter a Task...");
        return;
    }
    let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
    let id = Date.now();
    tasks.push({ id, text: get, checked: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toogleTask(id, checkbox) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
    let task = tasks.find(uid => uid.id === id);
    if (task) {
        task.checked = checkbox.checked;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
    let output = "";
    tasks.forEach(task => {
        output += `<div>
                   <input type="checkbox" ${task.checked ? 'checked' : ''} 
                   onchange ="toogleTask(${task.id},this)">
                   <span style="text-decoration:${task.checked ? 'line-through' : 'none'}">
                   ${task.text}
                </span>
        </div><hr>`
    });
    document.getElementById("output").innerHTML = output;
}

function DeleteFunction() {
    //localStorage.clear();
    document.getElementById('GetTask').value = "";
}
renderTasks();

function OpenSetting() {
    document.getElementById('theme').classList.add("active");
}

function CloseSetting() {
    document.getElementById('theme').classList.remove("active");
}

function Theme() 
{
    var element = document.getElementById('form');
    element.classList.toggle("dark-mode");
    var themeBtn = document.querySelector('.theme-button');

    if (element.classList.contains("dark-mode")) 
    {
        themeBtn.style.backgroundColor = "black";
        themeBtn.style.color = "white";
    }
    else 
    {
        themeBtn.style.backgroundColor = "white";
        themeBtn.style.color = "black";
    }
}

let currentIndex = 0;

function Color() 
{
    let colors = [
        "rgba(209, 253, 255, 1)",
        "rgba(178, 248, 252, 1)",
        "rgba(160, 250, 255, 1)",
        "rgba(144, 238, 243, 1)"
    ];

    let selectcolor = colors[currentIndex];
    document.body.style.backgroundColor = selectcolor;
    document.querySelectorAll('.color-button').forEach(btn => {
        btn.style.backgroundColor = selectcolor;
    });
    currentIndex = (currentIndex + 1) % colors.length;
    console.log(currentIndex);
}

function Check(cb) 
{
    let gettask = JSON.parse(localStorage.getItem('tasks') || "[]");
    let output = "";
    for (let i = 0; i < gettask.length; i++) 
        {
        if (gettask[i].checked === cb.checked) 
        {
            output += `<div>
                       <input type="checkbox" ${gettask[i].checked ? 'checked' : ''}> 
                       <span style="text-decoration:${gettask[i].checked ? 'line-through' : 'none'}">
                       ${gettask[i].text}
                </span>
        </div><hr>`
        }
    }
    document.getElementById("output").innerHTML = output;
}

function Showall()
{
    renderTasks();
}








