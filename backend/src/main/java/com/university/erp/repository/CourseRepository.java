package com.university.erp.repository;

import com.university.erp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository  extends JpaRepository<Course,Long>{
    List<Course> getCourseList();
//Basic CRUD Methods(save,findAll,findById,delete)are automatically included

}


