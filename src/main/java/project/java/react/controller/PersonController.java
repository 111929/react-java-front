package project.java.react.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



import project.java.react.entities.Person;
import project.java.react.repository.PersonRepository;
import project.java.react.service.PersonService;


@RestController
@CrossOrigin("*")
public class PersonController {

	@Autowired
	PersonService personService;
	@Autowired
	PersonRepository personRepository;
	@PostMapping("react/person")
	public ResponseEntity<Object> createdPerson(@RequestBody Person person){
		try { 
			//aqui se genera la person...
		Person p = new Person();
		p.setFirstName(person.getFirstName());
		p.setLastName(person.getLastName());
		p.setAddress(person.getAddress());
		p.setPhone(person.getPhone());
		personService.Save(p);
		person.setPersonId(p.getPersonId());
		}catch (Exception e) {
		return new ResponseEntity<Object>("the person not created",HttpStatus.CONFLICT);
		}
		return new ResponseEntity<Object>(person, HttpStatus.CREATED);
		
	}
	@GetMapping("react/person/{personId}")
	public ResponseEntity<Object> findPersonById(@PathVariable Long personId){
		
		Person person = personService.findByPersonId(personId);	
		if(person==null) {
			return new ResponseEntity<Object>( HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Object>(person, HttpStatus.CREATED);
		
	}
	@DeleteMapping("react/personDelete/{personId}")
	public ResponseEntity<Object> deletePersonById(@PathVariable Long personId){
	
		Person person = personService.findByPersonId(personId);	
	try {
		
		if(person!= null) {
			personRepository.delete(person);
		}else {
			return new ResponseEntity<Object>("person Not find", HttpStatus.OK);
		}
	} catch (Exception e) {
		
	}
	
		return new ResponseEntity<Object>(person +":"+"person remove sucessfull", HttpStatus.OK);
	}
	
	@GetMapping("react/person/all")
	public ResponseEntity<Object> findbyAll(){
		List<Person> person= personService.findByAll();
		
		return new ResponseEntity<Object>(person ,HttpStatus.OK);
	}
	
}
