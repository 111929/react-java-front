package project.java.react.service;

import java.util.List;

import project.java.react.entities.Person;

public interface PersonService {

	public Person Save(Person person);
	public List<Person> findByAll();
	public Person findByPersonId(Long personId);
	
	
}
