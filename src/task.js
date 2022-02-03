export default class Tasks{
    task = {
        id : "",
        idProject:"",
        titre: "",
        description: "",
        status:"",
        date_db: "",
        date_fn: ""
    }
     constructor(id,idProject,titre,description,status,date_db,date_fn){
         this.task.id = id
         this.task.titre = titre;
         this.task.idProject = idProject;
         this.task.status = status;
         this.task.description = description;
         this.task.date_db = date_db;
         this.task.date_fn = date_fn ;
         window.localStorage.setItem('Tasks'+id, JSON.stringify(this.task));
     }
     
 static get(key) {
    return  JSON.parse(window.localStorage.getItem('Tasks'+key));
  }

  static remove(key) {
    window.localStorage.removeItem('Tasks'+key);
  }

  }