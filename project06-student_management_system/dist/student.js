const generateStudentId = () => {
    // Generate a unique student ID here
    // Math.random generates a random decimal. To make it a 5-digit number, we multiply it by 100000.
    // We then use Math.floor to remove the decimal part.
    return Math.floor(Math.random() * 100000);
};
const createStudent = (name) => {
    const studentId = generateStudentId();
    const balance = Math.floor(Math.random() * 3 + 1) * 1000;
    const student = {
        name,
        studentId,
        balance,
        courses: [],
        enrollCourse(course, tuition) {
            this.courses.push({ course, tuition });
        },
        payTuition(amount) {
            if (amount <= this.balance) {
                this.balance -= amount;
            }
            else {
                throw new Error("Payment exceeds the balance");
            }
        },
    };
    return student;
};
export { createStudent };
