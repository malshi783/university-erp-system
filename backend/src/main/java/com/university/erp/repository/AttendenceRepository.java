package com.university.erp.repository;

import com.university.erp.model.Attendence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendence, Long> {
    List<Attendence> findByStudentRegNo(String studentRegNo);
    List<Attendence> findByCourseCode(String courseCode);
}