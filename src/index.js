import Project from './project';
import Tasks from './task';

let showProjects = []
let showTasks = []
let ProjectId
let ProjectIdShow = window.localStorage.getItem("ProjectIdShow")


// CLEAR ALL OF THE LOCALSTOREGE --------------------------------------------
document.querySelector('#ClearAll').addEventListener('click', () =>{
    window.localStorage.clear();
    location.reload();
})
// GET PROJECT ID ---------------------------------
document.addEventListener('click', (click)=>{
    if(click.target.classList.contains("setProjectId")){ 
        ProjectId = click.target.value
    }
})

// GET DATA FROM LOCAL STOREGE ------------------------------------------------
for (let index = 0; index < 1000; index++) {
    if (Project.get(index)) {
        showProjects.push(Project.get(index))
    }
}

for (let i = 0; i < 1000; i++) {
    if (Tasks.get(i)) {
        showTasks.push(Tasks.get(i))
    }
}

// ADD NEW PROJECT ---------------------------
let projectId = Number (showProjects[showProjects.length - 1]?.id) + 1 || 1 ;
document.addEventListener('submit' ,(event)=>{
    if(event.target.classList.contains("addProject")){
     let projectForm = event.target
      event.preventDefault();
      new Project(projectId ,
      projectForm.elements['titre'].value,
      projectForm.elements['description'].value,
      projectForm.elements['priorite'].value,
      projectForm.elements['date_db'].value,
      projectForm.elements['date_fn'].value
      )
      window.localStorage.setItem("ProjectIdShow", projectId);
      location.reload();
    }
 
},false)

// REMOVE PROJECT -------------------------------------
document.addEventListener('click', (event ) => {
    if(event.target.classList.contains("delete")){
    Project.remove(event.target.name);
    showTasks.forEach(element => {
        if (element.idProject == event.target.name) {
            Tasks.remove(element.id); 
        }   
    });
    location.reload();
  }
},false)

/// UPDATE PROJECT ------------------------------
document.addEventListener('submit' ,(event)=>{
    if(event.target.classList.contains("updateProject")){
     let projectupdate = event.target
      event.preventDefault();
      new Project(ProjectIdShow ,
      projectupdate.elements['titre'].value,
      projectupdate.elements['description'].value,
      projectupdate.elements['priorite'].value,
      projectupdate.elements['date_db'].value,
      projectupdate.elements['date_fn'].value
      )
      location.reload();
    }
 
},false)

// SHOW PROJECT ----------------
document.addEventListener('click', (event) => {
        if(event.target.classList.contains("AllProjectsList")){
            window.localStorage.setItem("ProjectIdShow", event.target.value);
           location.reload();
      }
},false)

showProjects.forEach(Project => {
    let Priority
   if (Project.priorite == "high") {
    Priority = "text-danger"    
   }else if(Project.priorite =="medium"){
    Priority = "text-warning"  
   }else{
    Priority = "text-info"  
   }


        const AllProjectsList = document.createElement('li');
        AllProjectsList.innerHTML = `<button value='${Project.id}' class="btn ${Priority} w-full AllProjectsList" >${Project.titre}</button>`
        document.getElementById('AllProjectsList').appendChild(AllProjectsList);

    if (Project.id == ProjectIdShow) {
      const div = document.createElement('div');
      div.innerHTML = 
      `<div class='m-1 p-3 card bg-light'>
            <h2 class='card-title' >${Project.titre}
                <button name='${Project.id}' class='m-2 btn btn-danger delete float-right'>Delete</button>
                <button name='${Project.id}' data-toggle="modal"
                data-target="#updateProjectModal" class='m-2 btn btn-success float-right'>Update</button>
            </h2>
            <h4>${Project.description}</h4>
            <div class="row">
                <div class="m-2 col-lg card">
                    <label class="card-title m-2" >TO DO :</label>
                    <hr/>
                    <div class="TO_DO${Project.id} height"></div>
                </div>
                <div class="m-2 col-lg card">
                    <label class="card-title m-2" >IN PROGRESS :</label>
                    <hr/>
                    <div class="IN_PROGRESS${Project.id} height "></div>
                </div>
                <div class="m-2 col-lg card">
                    <label class="card-title m-2" >DONE :</label>
                    <hr/>
                    <div class="DONE${Project.id} height"></div>
                </div>
            </div>
            <div>
                <button
                class="btn btn-info setProjectId"
                data-toggle="modal"
                data-target="#newTaskModal"
                value='${Project.id}'
                >
                Add Task
                </button> 
                <small class='float-right'>Start date : ${Project.date_db }  ///    End date :${Project.date_fn}</small>
            </div>
        </div>

        
        <div class="modal fade" id="updateProjectModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="model-Title">Update Project</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                 >
                <span aria-hidden="true" >&times;</span>
              </button>
            </div>
            <div class="modal-body" id="modale-body">
              <form method="post" class="updateProject" id="newProjectForm" >
                <div class="form-group">
                  <label for="taskTitle">Title: </label>
                  <input
                    type="text"
                    class="form-control "
                    name="titre"
                    id="projectName"
                    maxlength="20"
                    value="${Project.titre}"
                    required
                  />
                </div>
                <div class="form-group">
                    <label for="taskTitle">Description: </label>
                    <input
                      type="text"
                      class="form-control "
                      name="description"
                      id="projectName"
                      value="${Project.description}"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="oldtaskPriority">Priority: </label>
                    <select
                      class="custom-select"
                      id="oldtaskPriority"
                      name="priorite"
                      value="${Project.priorite}"
                      required
                    >
                     <option value="${Project.priorite}" selected hidden>${Project.priorite}</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <div class="invalid-feedback">Priority required</div>
                  </div>
                  <div class="form-group">
                    <label for="taskTitle">Start date: </label>
                    <input
                      type="date"
                      class="form-control "
                      name="date_db"
                      id="projectName"
                      maxlength="20"
                      value="${Project.date_db }"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="taskTitle">End date: </label>
                    <input
                      type="date"
                      class="form-control "
                      name="date_fn"
                      id="projectName"
                      maxlength="20"
                      value="${Project.date_fn }"
                      required
                    />
                  </div>
                <div class="form-group mb-0 d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-outline-secondary mr-1"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-success" id="modale_addProject_btn" aria-hidden="true" >
                    Update Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`  
      document.getElementById('editorContent').appendChild(div);

 // SHOW TASKS  OF PROJECT ------------------------------------------------   
      showTasks.forEach(Task => {
          if (Project.id == Task.idProject) {
           let status = '.'+Task.status+Project.id
        const projectTask = document.createElement('div');
    
        projectTask.innerHTML = `
        <div class="card m-2">
        <div class="card-header">
        ${Task.titre}
            </div>
            <div class="card-body">
                <p class="card-text">${Task.description}</p>
                <small>Start date : ${Task.date_db }  </small></br><small>End date :${Task.date_fn}</small>
              </br>
                <select class="mt-2 btn btn-secondary updateTask" name='${Task.id}'  required>
                <option disabled selected hidden>Change Status</option>
                <option value="TO_DO" >TO DO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
                <button name='${Task.id}' class='btn btn-danger mt-2 deleteTask float-right'>Delete Task</button>
                
            </div>
        </div>
        `
        window.addEventListener('load', (table)=>{
           if (table.target.querySelector(status)){
               document.querySelector(status).appendChild(projectTask);
           }
        })
    }
    });
}
});

/// ADD NEW TASK ---------------------------------------
let taskId = Number(showTasks[showTasks.length - 1]?.id + 1) || 1 ;
document.addEventListener('submit' ,(event)=>{
    if(event.target.classList.contains("addTask")){
    event.preventDefault();
      let tache = event.target
      new Tasks(taskId,
      ProjectId,
      tache.elements['titre'].value,
      tache.elements['description'].value,
      tache.elements['status'].value,
      tache.elements['date_db'].value,
      tache.elements['date_fn'].value)
      location.reload();
    }
})

/// DELETE TASK ------------------------------
document.addEventListener('click', (event ) => {
      if(event.target.classList.contains("deleteTask")){
      Tasks.remove(event.target.name);
      location.reload();
    }
},false)

// UPDATE TASK ------------------------
document.addEventListener('change', (change ) => {
    change.preventDefault();
    if(change.target.classList.contains("updateTask")){
        showTasks.forEach(element => {
            if (element.id ==  change.target.name ) {
                new Tasks(element.id ,
                    element.idProject,
                    element.titre,
                    element.description,
                    change.target.value,
                    element.date_db,
                    element.date_fn)
                    location.reload();
            }    
        });  
  }
},false)

