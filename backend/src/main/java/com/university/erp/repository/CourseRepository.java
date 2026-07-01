package com.university.erp.repository;

import com.university.erp.model.Course;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository  extends JpaRepository<Course,Long>{
    List<Course> getCourseList();
//Basic CRUD Methods(save,findAll,findById,delete)are automatically included

}


