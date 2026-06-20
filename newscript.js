const addProjectBtn =
    document.getElementById("addProjectBtn");

const projectName =
    document.getElementById("projectName");

const projectContainer =
    document.getElementById("projectContainer");

const projectCount =
    document.getElementById("projectCount");

const taskCount =
    document.getElementById("taskCount");

const completedCount =
    document.getElementById("completedCount");

const pendingCount =
    document.getElementById("pendingCount");

let projects = [];

addProjectBtn.addEventListener("click", () => {


    const name =
        projectName.value.trim();

    if (name === "") {
        alert("Enter Project Name");
        return;
    }

    const project = {
        id: Date.now(),
        name: name,
        tasks: []
    };

    projects.push(project);

    projectName.value = "";

    renderProjects();


});

function renderProjects() {


    projectContainer.innerHTML = "";

    projects.forEach(project => {

        const card =
            document.createElement("div");

        card.className =
            "project-card";

        card.innerHTML =

            '<h2>' + project.name + '</h2>' +

            '<div class="task-form">' +

            '<input class="taskInput" placeholder="Task Name">' +

            '<input class="assignInput" placeholder="Assign To">' +

            '<input class="dateInput" type="date">' +

            '<select class="prioritySelect">' +

            '<option>High</option>' +

            '<option>Medium</option>' +

            '<option>Low</option>' +

            '</select>' +

            '<button class="addTaskBtn" data-id="' + project.id + '">' +

            'Add Task' +

            '</button>' +

            '</div>' +

            '<div class="task-list">' +

            renderTasks(project.tasks) +

            '</div>';

        projectContainer.appendChild(card);

    });

    updateDashboard();

}

function renderTasks(tasks) {


    let html = "";

    tasks.forEach(task => {

        html +=

            '<div class="task ' +

            (task.completed ? 'completed' : '') +

            '">' +

            '<h4>' + task.name + '</h4>' +

            '<p>Assigned: ' + task.assigned + '</p>' +

            '<p>Due: ' + task.date + '</p>' +

            '<p>' + task.priority + ' Priority</p>' +

            '<button class="completeBtn" data-task="' + task.id + '">' +

            'Complete' +

            '</button>' +

            '<button class="deleteBtn" data-task="' + task.id + '">' +

            'Delete' +

            '</button>' +

            '</div>';

    });

    return html;


}

projectContainer.addEventListener("click", (e) => {


    if (e.target.classList.contains("addTaskBtn")) {

        const projectId =
            Number(e.target.dataset.id);

        const projectCard =
            e.target.closest(".project-card");

        const taskName =
            projectCard.querySelector(".taskInput").value;

        const assigned =
            projectCard.querySelector(".assignInput").value;

        const date =
            projectCard.querySelector(".dateInput").value;

        const priority =
            projectCard.querySelector(".prioritySelect").value;

        if (taskName.trim() === "") return;

        const project =
            projects.find(
                p => p.id === projectId
            );

        project.tasks.push({

            id: Date.now(),

            name: taskName,

            assigned: assigned,

            date: date,

            priority: priority,

            completed: false

        });

        renderProjects();

    }

    if (e.target.classList.contains("deleteBtn")) {

        const taskId =
            Number(e.target.dataset.task);

        projects.forEach(project => {

            project.tasks =
                project.tasks.filter(
                    task => task.id !== taskId
                );

        });

        renderProjects();

    }

    if (e.target.classList.contains("completeBtn")) {

        const taskId =
            Number(e.target.dataset.task);

        projects.forEach(project => {

            project.tasks.forEach(task => {

                if (task.id === taskId) {

                    task.completed =
                        !task.completed;

                }

            });

        });

        renderProjects();

    }


});

function updateDashboard() {


    let totalTasks = 0;

    let completed = 0;

    projects.forEach(project => {

        totalTasks +=
            project.tasks.length;

        completed +=
            project.tasks.filter(
                task => task.completed
            ).length;

    });

    projectCount.textContent =
        projects.length;

    taskCount.textContent =
        totalTasks;

    completedCount.textContent =
        completed;

    pendingCount.textContent =
        totalTasks - completed;


}
