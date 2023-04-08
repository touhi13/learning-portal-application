import { useParams } from "react-router-dom";
import AssignmentForm from '../../components/form/assignment/AssignmentForm';
import { useGetAssignmentQuery } from "../../features/assignments/assignmentsApi";
import AdminLayout from "../../components/layout/AdminLayout";


export default function EditAssignment() {
  const { assignmentId } = useParams();
  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentQuery(assignmentId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && assignment?.id) {
    content = <AssignmentForm assignment={assignment} />;
  }
  return (
    <AdminLayout>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Assignment
        </h2>
      </div>
      {content}
    </AdminLayout>
  );
}
