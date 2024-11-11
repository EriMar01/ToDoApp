package ToDoBackEndApplication.service.impl;

import ToDoBackEndApplication.exception.ResourceNotFoundException;
import ToDoBackEndApplication.exception.InvalidDataException;
import ToDoBackEndApplication.exception.OperationFailedException;
import ToDoBackEndApplication.model.ToDo;
import ToDoBackEndApplication.repository.IToDoRepository;
import ToDoBackEndApplication.service.IToDoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ToDoService implements IToDoService {

    @Autowired
    private IToDoRepository todoRepository;

    @Override
    public List<ToDo> getAllTodos() {
        Sort sortByCreatedAtDesc = Sort.by(Sort.Direction.DESC, "createdAt");
        List<ToDo> todos = todoRepository.findAll(sortByCreatedAtDesc);

        if (todos.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron los To Do");
        }

        return todos;
    }

    @Override
    public ToDo createToDo(ToDo toDo) {
        if (toDo == null || toDo.getTitle() == null || toDo.getTitle().isEmpty()) {
            throw new InvalidDataException("El To Do no puede estar vacío y debe tener un título válido");
        }

        // Validar que el userId no sea nulo o vacío
        if (toDo.getUserId() == null || toDo.getUserId().isEmpty()) {
            throw new InvalidDataException("El To Do debe estar asociado a un usuario (userId)");
        }

        toDo.setCompleted(false);
        try {
            return todoRepository.save(toDo);
        } catch (Exception e) {
            log.error("Error al crear el To Do: {}", e.getMessage());
            throw new OperationFailedException("Error al crear el To Do");
        }
    }


    @Override
    public ResponseEntity<List <ToDo>> getToDoByUser(String userId) {
        // Verificamos que el userId no sea nulo o vacío
        if (userId == null || userId.isEmpty()) {
            throw new InvalidDataException("El userId no puede estar vacío.");
        }

        // Buscamos todos los ToDo asociados a este userId
        List<ToDo> todos = todoRepository.findByUserId(userId);

        // Si no hay ToDos, lanzamos una excepción de recurso no encontrado
        if (todos.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron ToDo para el usuario con ID: " + userId);
        }

        // Devolvemos la lista de ToDos
        return ResponseEntity.ok().body(todos);
    }


    @Override
    public ResponseEntity<ToDo> getToDoById(String id) {
        return todoRepository.findById(id)
                .map(toDo -> ResponseEntity.ok().body(toDo))
                .orElseThrow(() -> new ResourceNotFoundException("To Do no encontrado con ID: " + id));
    }

    @Override
    public ResponseEntity<ToDo> updateToDo(String id, ToDo toDo) {
        if (toDo == null || toDo.getTitle() == null || toDo.getTitle().isEmpty()) {
            throw new InvalidDataException("El To Do no puede estar vacío y debe tener un título válido");
        }

        return todoRepository.findById(id)
                .map(toDoData -> {
                    toDoData.setTitle(toDo.getTitle());
                    toDoData.setCompleted(toDo.getCompleted());
                    try {
                        ToDo updatedToDo = todoRepository.save(toDoData);
                        return ResponseEntity.ok().body(updatedToDo);
                    } catch (Exception e) {
                        log.error("Error al actualizar el To Do: {}", e.getMessage());
                        throw new OperationFailedException("Error al actualizar el To Do");
                    }
                }).orElseThrow(() -> new ResourceNotFoundException("To Do no encontrado con ID: " + id));
    }

    @Override
    public ResponseEntity<?> deleteToDo(String id) {
        return todoRepository.findById(id)
                .map(toDo -> {
                    try {
                        todoRepository.deleteById(id);
                        return ResponseEntity.ok().build();
                    } catch (Exception e) {
                        log.error("Error al eliminar el To Do: {}", e.getMessage());
                        throw new OperationFailedException("Error al eliminar el To Do");
                    }
                }).orElseThrow(() -> new ResourceNotFoundException("To Do no encontrado con ID: " + id));
    }
}
