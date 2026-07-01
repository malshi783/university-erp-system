package com.university.erp.controller;

import com.university.erp.model.Course;
import com.university.erp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {


    @Autowired
    private CourseRepository courseRepository;


    //End Point to create a new course
    @PostMapping
    public Course save(@RequestBody Course course){
        return courseRepository.save(course);
    }


    //End points to view all Registered  courses
    @GetMapping
    public List<Course> getAllCourses(){
        return courseRepository.getCourseList()!=null?courseRepository.findAll():courseRepository.findAll();

    }

}
