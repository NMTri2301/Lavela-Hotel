package com.bookinghotel.Lavela_Hotel.service;

import com.bookinghotel.Lavela_Hotel.exception.RoleAlreadyExistException;
import com.bookinghotel.Lavela_Hotel.exception.UserAlreadyExistsException;
import com.bookinghotel.Lavela_Hotel.model.Role;
import com.bookinghotel.Lavela_Hotel.model.User;
import com.bookinghotel.Lavela_Hotel.repository.RoleRepository;
import com.bookinghotel.Lavela_Hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = theRole.getName().toUpperCase();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(roleName + " already exists");
        }
        Role role = new Role(roleName);
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));
        removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Role with name " + name + " not found"));

    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));

        if (!role.getUsers().contains(user)) {
            throw new IllegalStateException("User is not assigned to this role");
        }

        role.removeUserFromRole(user);
        roleRepository.save(role);
        return user;
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));

        if (user.getRoles().contains(role)) {
            throw new UserAlreadyExistsException(
                    user.getFirstName() + " is already assigned to the " + role.getName() + " role");
        }

        role.assignRoleToUser(user);
        roleRepository.save(role);
        return user;
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));
        role.removeAllUsersFromRole();
        return roleRepository.save(role);
    }
}