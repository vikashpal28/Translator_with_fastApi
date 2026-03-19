package com.example._ThSem_Project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

   @Email
   @NotBlank
   @Column(unique = true)
    String username;


    @Size(min = 2, max = 50)
    String name;

    @NotBlank
    @Size(min = 6)
    String password;

    @Column(columnDefinition = "integer default 0")
    Integer score = 0;

    @Column(columnDefinition = "integer default 0")
    Integer currentStreak = 0;

    @Column(columnDefinition = "integer default 0")
    Integer longestStreak = 0;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
}
