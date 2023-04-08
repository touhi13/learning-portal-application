import { useParams } from "react-router-dom";
import { useGetQuizQuery } from "../../features/quizzes/quizzesApi";
import QuizForm from "../../components/form/quiz/QuizForm";
import AdminLayout from "../../components/layout/AdminLayout";


export default function EditQuiz() {

  const { quizId } = useParams();
  const { data: quiz, isLoading, isError, error } = useGetQuizQuery(quizId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && quiz?.id) {
    content = <QuizForm quiz={quiz} />;
  }

  return (
    <AdminLayout>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Quiz
        </h2>
      </div>
          {content}
    </AdminLayout>


  );
}
