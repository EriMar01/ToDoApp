package ToDoBackEndApplication.service;

import ToDoBackEndApplication.model.ToDo;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IToDoService {

    List<ToDo> getAllTodos();

    ToDo createToDo(ToDo toDo);

    ResponseEntity<List<ToDo>> getToDoByUser(String userId);

    ResponseEntity<ToDo> getToDoById(String id);

    ResponseEntity<ToDo> updateToDo(String id, ToDo toDo);

    ResponseEntity<?> deleteToDo(String id);

}