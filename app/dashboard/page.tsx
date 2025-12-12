export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">GSMS Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Student Information</h2>
          <p>Manage enrollment and records</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Staff Management</h2>
          <p>HR and Payroll</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Academics</h2>
          <p>Curriculum and Grading</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Finance</h2>
          <p>Fees and Expenses</p>
        </div>
      </div>
    </div>
  );
}
