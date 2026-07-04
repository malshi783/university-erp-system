package com.university.erp.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class AttendanceRepositoryTests {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Test
    void savesAndFindsAttendance() {
        Attendance attendance = new Attendance();
        attendance.setStudentRegNo("2024001");
        attendance.setCourseCode("CS101");
        attendance.setDate(LocalDate.of(2026, 7, 1));
        attendance.setStatus("Present");

        Attendance saved = attendanceRepository.save(attendance);

        assertThat(saved.getId()).isNotNull();
        assertThat(attendanceRepository.findById(saved.getId())).isPresent();
    }
}
