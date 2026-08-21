let currentUser =
    localStorage.getItem("currentUser");

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = null;

function login(){

    const username =
        document.getElementById("username").value;

    if(username.trim() === ""){
        alert("Enter username");
        return;
    }

    localStorage.setItem(
        "currentUser",
        username
    );

    currentUser = username;

    showDashboard();
}

function logout(){

    localStorage.removeItem("currentUser");

    location.reload();
}

function showDashboard(){

    document.getElementById(
        "authSection"
    ).classList.add("hidden");

    document.getElementById(
        "dashboard"
    ).classList.remove("hidden");

    document.getElementById(
        "userDisplay"
    ).textContent = currentUser;

    displayTasks();
}

function saveTask(){

    const title =
        document.getElementById("taskTitle").value;

    const description =
        document.getElementById("taskDesc").value;

    if(title === "" || description === ""){
        alert("Fill all fields");
        return;
    }

    if(editIndex !== null){

        tasks[editIndex].title =
            title;

        tasks[editIndex].description =
            description;

        editIndex = null;

    }else{

        tasks.unshift({
            title,
            description,
            completed:false,
            owner:currentUser
        });
    }

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    document.getElementById(
        "taskTitle"
    ).value = "";

    document.getElementById(
        "taskDesc"
    ).value = "";

    displayTasks();
}

function displayTasks(){

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    const userTasks =
        tasks.filter(
            task => task.owner === currentUser
        );

    userTasks.forEach((task,index)=>{

        const div =
            document.createElement("div");

        div.className =
            task.completed
            ? "task completed"
            : "task";

        div.innerHTML = `

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <div class="actions">

                <button
                    class="complete-btn"
                    onclick="toggleComplete(${tasks.indexOf(task)})">
                    ${
                        task.completed
                        ? "Undo"
                        : "Complete"
                    }
                </button>

                <button
                    class="edit-btn"
                    onclick="editTask(${tasks.indexOf(task)})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${tasks.indexOf(task)})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(div);
    });
}

function toggleComplete(index){

    tasks[index].completed =
        !tasks[index].completed;

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}

function editTask(index){

    document.getElementById(
        "taskTitle"
    ).value = tasks[index].title;

    document.getElementById(
        "taskDesc"
    ).value = tasks[index].description;

    editIndex = index;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function deleteTask(index){

    if(confirm("Delete task?")){

        tasks.splice(index,1);

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        displayTasks();
    }
}

if(currentUser){
    showDashboard();
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    const btn = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-theme")) {
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}