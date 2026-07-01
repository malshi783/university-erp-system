// ==========================================
// ATTENDANCE MODULE LOGIC (Your Hardest Part!)
// ==========================================

// This runs automatically the microsecond the attendance page opens
document.addEventListener("DOMContentLoaded", function() {
    loadStudentsForAttendance();
});

// Step 1: Fetch active students from your backend and draw them on screen
async function loadStudentsForAttendance() {
    try {
        const response = await fetch("http://localhost:8080/api/students");
        const students = await response.json();

        const tableBody = document.getElementById("studentAttendanceRows");
        tableBody.innerHTML = ""; // Clear out old data placeholders

        // Loop through your backend student records and build rows dynamically
        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>
                        <input type="checkbox" class="form-check-input attendance-check" data-id="${student.id}">
                    </td>
                </tr>`;
            tableBody.innerHTML += row; // Inject row into the live HTML page
        });
    } catch (error) {
        console.error("Error loading student data pipeline:", error);
    }
}

// Step 2: Loop through checkboxes and POST data to Attendance API
async function submitAttendance() {
    const date = document.getElementById("attendanceDate").value;
    if(!date) {
        alert("Please select a valid date first!");
        return;
    }

    const attendanceRecords = [];
    const checkboxes = document.querySelectorAll(".attendance-check");

    // Scan every checkbox on the page to verify state
    checkboxes.forEach(box => {
        attendanceRecords.push({
            studentId: box.getAttribute("data-id"),
            date: date,
            status: box.checked ? "PRESENT" : "ABSENT"
        });
    });

    // Send the structured data array straight to your Spring Boot controller
    try {
        const response = await fetch("http://localhost:8080/api/attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attendanceRecords)
        });

        if(response.ok) {
            alert("Attendance records saved successfully to MySQL!");
        }
    } catch (error) {
        console.error("Transmission failure:", error);
    }
}