package fi.haagahelia;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.haagahelia.domain.Student;
import fi.haagahelia.domain.StudentRepository;
import fi.haagahelia.domain.User;
import fi.haagahelia.domain.UserRepository;

@SpringBootApplication
public class StudentRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentRestApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(StudentRepository repository,
			UserRepository users) {

		User user1 = new User("user",
				"$2a$06$3jYRJrg0ghaaypjZ/.g4SethoeA51ph3UD4kZi9oPkeMTpjKU5uo6",
				"USER");
		User user2 = new User("admin",
				"$2a$10$0MMwY.IQqpsVc1jC8u7IJ.2rT8b0Cd3b3sfIBGV2zfgnPGtT4r0.C",
				"ADMIN");

		return (args) -> {
			repository.save(new Student("Mary", "Poppins", "mary@mail.com"));
			repository.save(new Student("John", "Johnson", "john@mail.com"));
			repository.save(new Student("Mike", "Mitchell", "mike@email.com"));

			users.save(user1);
			users.save(user2);
		};
	}

}
