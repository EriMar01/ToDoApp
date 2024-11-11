package ToDoBackEndApplication.auth;

import ToDoBackEndApplication.configuration.JwtService;
import ToDoBackEndApplication.model.Role;
import ToDoBackEndApplication.model.User;
import ToDoBackEndApplication.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final IUserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Método de registro
    public AuthenticationResponse registro(RegisterRequest request) {
        if(!repository.findByEmail(request.getEmail()).isPresent()){
            var user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))  // Codifica la contraseña
                    .role(Role.USER)  // Asigna un rol por defecto
                    .build();

            repository.save(user);  // Guarda el usuario en la base de datos

            var jwtToken = jwtService.generateToken(user);  // Genera el token JWT
            return AuthenticationResponse.builder()
                    .jwt(jwtToken)
                    .build();
        }



        return null;
    }

    // Método de login
    public AuthenticationResponse login(AuthenticationRequest request) {
        // Autentica el usuario
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return null;
        }
        var user = (UserDetails) repository.findByEmail(request.getEmail()).get();

        // Genera el token JWT
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .jwt(jwtToken)
                .build();
    }
}