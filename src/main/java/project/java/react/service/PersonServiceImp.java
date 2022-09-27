package project.java.react.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.java.react.entities.Person;
import project.java.react.repository.PersonRepository;
@Service
public class PersonServiceImp implements PersonService {

	@Autowired
	PersonRepository personRepository;
	@Override
	
	public Person Save(Person person) {
		
		return personRepository.save(person);
	}



	@Override
	public Person findByPersonId(Long personId) {
	
		return personRepository.findByPersonId(personId);
	}



	@Override
	public List<Person> findByAll() {
		List<Person> list = (List<Person>) personRepository.findAll();
		return list;
	}

}
