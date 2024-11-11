package ToDoBackEndApplication.controller;
import ToDoBackEndApplication.model.ToDo;
import ToDoBackEndApplication.service.IToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ToDoController {
    @Autowired
    private IToDoService toDoService;



    @GetMapping("/todos")
    public List<ToDo> getAllTodos() {
        return toDoService.getAllTodos();
    }

    @GetMapping("/todos/user/{userId}")
    public ResponseEntity<List<ToDo>> getTodosByUser(@PathVariable String userId) {
        return toDoService.getToDoByUser(userId);
    }
    @PostMapping("/todos")
    public ToDo createToDo(@Valid @RequestBody ToDo toDo) {
        return toDoService.createToDo(toDo);
    }

    @GetMapping(value = "/todos/{id}")
    public ResponseEntity<ToDo> getToDoById(@PathVariable("id") String id) {
        return toDoService.getToDoById(id);
    }

    @PutMapping(value = "/todos/{id}")
    public ResponseEntity<ToDo> updateToDo(@PathVariable("id") String id,
                                           @Valid @RequestBody ToDo toDo) {
        return toDoService.updateToDo(id, toDo);
    }

    @DeleteMapping(value = "/todos/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable("id") String id) {
        return toDoService.deleteToDo(id);
    }

}
