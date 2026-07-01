// ==========================================================================
// CAMPUS ERP SYSTEM - ATTENDANCE PIPELINE INTEGRATION LOGIC
// ==========================================================================

const API_BASE_URL = "http://localhost:8080/api";

// Initialize date field automatically to today's local system date
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("attendanceDate").valueAsDate = new Date();
    populateCourseDropdown();
});

// 1. Fetch available courses to cleanly populate your dynamic dropdown selection
async function populateCourseDropdown() {
    const courseSelect = document.getElementById("courseSelect");
    try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        if (!response.ok) throw new Error("Failed to load backend courses routing endpoint.");

        const courses = await response.json();
        courses.forEach(course => {
            const opt = document.createElement("option");
            opt.value = course.id;
            opt.textContent = `[${course.code}] ${course.name}`;
            courseSelect.appendChild(opt);
        });
    } catch (err) {
        console.error("Pipeline breakdown:", err);
    }
}

// 2. Fetch Active Student Roster with loading states and data rendering
async function loadRoster() {
    const tableBody = document.getElementById("attendanceTableBody");
    const countBadge = document.getElementById("studentCountBadge");
    const submitBtn = document.getElementById("submitBtn");
    const courseId = document.getElementById("courseSelect").value;

    if (!courseId) {
        alert("Configuration Parameter Missing: Please pick an active target course module first.");
        return;
    }

    // Set UI to a sleek loading spinning container state
    tableBody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <span class="d-block mt-2 text-secondary fw-semibold">Compiling real-time relational database metrics...</span>
            </td>
        </tr>`;

    try {
        const response = await fetch(`${API_BASE_URL}/students`); // Queries core student index arrays
        if (!response.ok) throw new Error("Data retrieval pipeline failure.");

        const students = await response.json();
        tableBody.innerHTML = ""; // Clear loader placeholder

        if (students.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-5">No student registrations found for this program block.</td></tr>`;
            submitBtn.classList.add("d-none");
            countBadge.textContent = "0 Students Loaded";
            return;
        }

        // Dynamically build and style layout rows safely for the template DOM
        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="ps-4 fw-bold text-primary">#STU-${student.id.toString().padStart(4, '0')}</td>
                <td><div class="fw-semibold text-dark">${student.name}</div></td>
                <td><span class="text-secondary">${student.email || 'n/a@university.edu'}</span></td>
                <td class="text-center">
                    <div class="btn-group w-100" role="group">
                        <input type="radio" class="btn-check" name="status-${student.id}" id="present-${student.id}" value="PRESENT" checked>
                        <label class="btn btn-outline-success btn-sm py-2" for="present-${student.id}"><i class="fa-solid fa-check me-1"></i>Present</label>

                        <input type="radio" class="btn-check" name="status-${student.id}" id="absent-${student.id}" value="ABSENT">
                        <label class="btn btn-outline-danger btn-sm py-2" for="absent-${student.id}"><i class="fa-solid fa-xmark me-1"></i>Absent</label>
                    </div>
                </td>`;
            tableBody.appendChild(row);
        });

        countBadge.textContent = `${students.length} Students Loaded`;
        submitBtn.classList.remove("d-none"); // Smoothly display the master commit operations control action button

    } catch (err) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger py-4"><i class="fa-solid fa-circle-exclamation me-2"></i>Network Exception encountered fetching database arrays: ${err.message}</td></tr>`;
    }
}

// 3. Extract parameters to map multi-tiered structural JSON arrays to back-end endpoints
async function submitAttendance() {
    const date = document.getElementById("attendanceDate").value;
    const courseId = document.getElementById("courseSelect").value;
    const rows = document.querySelectorAll("#attendanceTableBody tr");
    const payload = [];

    if (!date) return alert("Validation Error: Operation requires a selected date context.");

    rows.forEach(row => {
        const checkedRadio = row.querySelector('input[type="radio"]:checked');
        if (!checkedRadio) return;

        const studentId = checkedRadio.name.split("-")[1];
        payload.push({
            studentId: parseInt(studentId),
            courseId: parseInt(courseId),
            date: date,
            status: checkedRadio.value
        });
    });

    try {
        const response = await fetch(`${API_BASE_URL}/attendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Success: Attendance registry maps committed flawlessly to database records.");
        } else {
            alert("Server Rejected Payload Package: Verify controller mapping configuration schema parameters.");
        }
    } catch (err) {
        alert(`Critical Network Transport Exception: ${err.message}`);
    }
}