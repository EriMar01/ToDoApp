package ToDoBackEndApplication.auth;

import ToDoBackEndApplication.auth.dto.ResponseUnathorizedDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<?> registro (
            @RequestBody RegisterRequest request) {
        AuthenticationResponse response = service.registro(request);
        if(response != null) {
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(ResponseUnathorizedDto.builder()
                            .message("Correo ya existe!")
                            .status(HttpStatus.CONFLICT.value()).build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (
            @RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = service.login(request);
        if(response != null) {
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(ResponseUnathorizedDto.builder()
                            .message("Las credenciales son incorrectas")
                            .status(HttpStatus.UNAUTHORIZED.value()).build());
        }
    }

}