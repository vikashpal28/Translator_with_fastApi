package com.example._ThSem_Project.repository;

import com.example._ThSem_Project.entity.UserFeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFeedBackRepository extends JpaRepository<UserFeedBack , Long> {
    UserFeedBack findByUserId(Long id);
}
