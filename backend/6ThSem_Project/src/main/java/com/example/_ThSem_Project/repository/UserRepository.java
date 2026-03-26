package com.example._ThSem_Project.repository;

import com.example._ThSem_Project.dto.LeaderboardResponse;
import com.example._ThSem_Project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User , Long> {
    Optional<User> findByUsername(String username);

    @Query("""
    SELECT u.name , u.longestStreak , u.score FROM User u
    ORDER BY score DESC
""")
    List<LeaderboardResponse> getAllUsersByScore();
}
