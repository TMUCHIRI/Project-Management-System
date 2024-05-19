let project = document.getElementById('text');
let formProject = document.getElementById('textForm');
let allProjects = JSON.parse(localStorage.getItem('projects')) || [];

formProject.addEventListener('submit', (event) => {
    event.preventDefault();

    let work = project.value.trim() !== '';

    if (work) {
        let newWork = {
            newProject: project.value.trim()
        };

        let exists = allProjects.some(proj => proj.newProject === newWork.newProject);

        if (!exists) {
            allProjects.push(newWork);
            localStorage.setItem('projects', JSON.stringify(allProjects));

            project.value = '';

            displayProject();
        } else {
            console.log("Project exists");
        }
    }
});

function displayProject() {
    let projectList = localStorage.getItem('projects');

    if (projectList) {
        let projects = JSON.parse(projectList);

        let currentProjects = document.querySelectorAll('#viewProjects .projectData');
        currentProjects.forEach(projectRow => {
            projectRow.remove();
        });

        projects.forEach((moreWork, index) => {
            let projectNumber = document.createElement('td');
            projectNumber.textContent = index + 1;

            let projectName = document.createElement('td');
            projectName.textContent = moreWork.newProject;

            let deletebtn = document.createElement('button');
            deletebtn.textContent = 'Delete';

            deletebtn.addEventListener('click', () => {
                projects.splice(index, 1);
                localStorage.setItem('projects', JSON.stringify(projects));
                displayProject();
            });

            let newRow = document.createElement('tr');
            newRow.className = 'projectData';

            newRow.appendChild(projectNumber);
            newRow.appendChild(projectName);
            newRow.appendChild(deletebtn);

            let projectTable = document.querySelector('#viewProjects');
            projectTable.appendChild(newRow);
        });
    }
}

displayProject();

let viewAllButton = document.getElementById('allProjects');
viewAllButton.addEventListener('click', ()=>{
    displayProject();
})
