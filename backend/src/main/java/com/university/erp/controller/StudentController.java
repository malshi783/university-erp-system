package com.university.erp.controller;

import com.university.erp.model.Student;
import com.university.erp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/students")
public class StudentController {

@Autowired
    private StudentRepository studentRepository;

    //Create a Student (POST Request)
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);

    }


    //Get All students (GET Request)
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
