package project.java.react.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import project.java.react.entities.Person;

@Component
public interface PersonRepository extends CrudRepository<Person, Long> {

	public Person findByPersonId(Long personId);
}
