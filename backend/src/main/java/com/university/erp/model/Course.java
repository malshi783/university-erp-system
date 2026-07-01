package com.university.erp.model;

import jakarta.persistence.*;


@Entity
@Table(name="courses")
public class Course {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String courseName;
    private String courseCode;
    private String faculty;
    private int credits ;


    //Constructers
    public Course() {}
    public Course(String courseName, String courseCode, String faculty, int credits) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.faculty = faculty;
        this.credits = credits;

    }

    //Getters and Settters
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;

    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }
}
