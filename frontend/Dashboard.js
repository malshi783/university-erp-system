// ==========================================================================
// CAMPUS ERP SYSTEM - CENTRAL DASHBOARD DYNAMIC INTEGRATION
// ==========================================================================

const API_BASE_URL = "http://localhost:8080/api";

// 1. Page එක load වෙනකොටම backend APIs වලට කතා කරන්න trigger එක දීම
document.addEventListener("DOMContentLoaded", () => {
    fetchDashboardMetrics();
});

// 2. Main function to fetch metrics from backend repositories
async function fetchDashboardMetrics() {
    try {
        // --- FETCH TOTAL STUDENTS COUNT ---
        const studentResponse = await fetch(`${API_BASE_URL}/students`);
        if (studentResponse.ok) {
            const students = await studentResponse.json();
            // Array එකේ length එකෙන් මුළු සිසුන් ගණන ගන්නවා
            document.getElementById("totalStudentsCount").textContent = students.length;
        }

        // --- FETCH TOTAL COURSES COUNT ---
        const courseResponse = await fetch(`${API_BASE_URL}/courses`);
        if (courseResponse.ok) {
            const courses = await courseResponse.json();
            // Array එකේ length එකෙන් මුළු කෝෂස් ගණන ගන්නවා
            document.getElementById("totalCoursesCount").textContent = courses.length;
        }

        // Note: Lecturers සහ Exams endpoints ඔයාගේ backend එකේ හැදුවට පස්සේ
        // මේ විදිහටම ඒවායේ counts ටිකත් dynamic කරගන්න පුළුවන්.

    } catch (error) {
        console.error("Dashboard metrics pipeline error:", error);
    }
}