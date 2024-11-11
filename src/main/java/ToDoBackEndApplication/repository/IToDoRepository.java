package ToDoBackEndApplication.repository;

import ToDoBackEndApplication.model.ToDo;
import ToDoBackEndApplication.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IToDoRepository extends MongoRepository<ToDo, String> {
    List<ToDo> findByUserId(String UserId);
}
