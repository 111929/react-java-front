import axios from 'axios'

export class PersonService{
    baseUrl= "http://localhost:8080/react/person/";
    getAll(){
        return axios.get(this.baseUrl+"all").then(res=>res.data);
    }
    save(persona){
        return axios.post(this.baseUrl+"created",persona).then(res=>res.data);
    }

}