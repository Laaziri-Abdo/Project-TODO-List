export default class Project{
     project = {
        id : "",
        titre: "",
        priorite:"",
        description: "",
        date_db: "",
        date_fn: ""
    }
     constructor(id,titre,description,priorite,date_db,date_fn){
         this.project.id = id
         this.project.titre = titre;
         this.project.priorite = priorite;
         this.project.description = description;
         this.project.date_db = date_db;
         this.project.date_fn = date_fn ;
         window.localStorage.setItem('Project'+id, JSON.stringify(this.project));
     }
 static get(key) {
    return  JSON.parse(window.localStorage.getItem('Project'+key));
  }

  static remove(key) {
    window.localStorage.removeItem('Project'+key);
  }
  
  
  }
  