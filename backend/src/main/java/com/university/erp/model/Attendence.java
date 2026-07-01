package com.university.erp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "attendence")
@Data
class Attendence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentRegNo;
    private String courseCode;
    private LocalDate date;
    private String status;
}