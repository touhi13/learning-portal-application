import { useNavigate, useParams } from 'react-router-dom';
import StudentLayout from '../../components/layout/StudentLayout';
import { useSelector } from 'react-redux';
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi';
import { useGetVideoQuery } from '../../features/videos/videosApi';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import { useAddQuizMarkMutation } from '../../features/quizMark/quizMarkApi';

export default function Quiz() {
    // Accessing the auth state from the Redux store
    const { user } = useSelector((state) => state.auth);
    const { id: studentId, name: studentName } = user;

    const { videoId } = useParams();
    const navigate = useNavigate();



    const { data: quizMarks } = useGetQuizMarksQuery();

    const submittedQuiz = quizMarks?.find(
        (quiz) => quiz.student_id == studentId && quiz.video_id == videoId
    );
    if (submittedQuiz) navigate(`/course-player/1`);

    const {
        data: video,
        isLoading: videoIsLoading,
        isError: videoIsError,
    } = useGetVideoQuery(videoId);

    const {
        data: quizzes,
        isLoading: quizzesIsLoading,
        isError: quizzesIsError,
    } = useGetQuizzesQuery();

    const [addQuizMark, { isLoading }] = useAddQuizMarkMutation();

    const concernedQuizzes = quizzes?.filter(
        (quiz) => quiz.video_id === video?.id
    );

    let answerArray = [];
    const handleChange = (e, question, providedOption) => {
        let answerAvailable = answerArray.find(
            (answer) => answer?.question === question
        );
        if (answerAvailable) {
            let sameOptionAvailableAt = answerAvailable.options.findIndex(
                (option) => option.option === providedOption.option
            );
            sameOptionAvailableAt >= 0
                ? answerAvailable.options.splice(sameOptionAvailableAt, 1)
                : answerAvailable.options.push(providedOption);
        } else {
            answerArray.push({
                question,
                options: [providedOption],
            });
        }
    };

    function areEqual(arr1, arr2) {
        let N = arr1.length;
        let M = arr2.length;

        // If lengths of array are not equal means
        // array are not equal
        if (N !== M) return false;

        // Sort both arrays
        arr1.sort();
        arr2.sort();

        // Linearly compare elements
        for (let i = 0; i < N; i++) if (arr1[i] !== arr2[i]) return false;

        // If all elements were same.
        return true;
    }

    let quizMark = 0;
    function calculateResult() {
        concernedQuizzes.forEach((quiz) => {
            answerArray.forEach((answer) => {
                if (answer.question === quiz.question) {
                    const rightAnswers = quiz.options.filter(
                        (option) => option.isCorrect
                    );
                    areEqual(answer.options, rightAnswers)
                        ? (quizMark += 5)
                        : (quizMark += 0);
                }
            });
        });
    }

    const handleColorChange = (e) => {
        e.target.style.backgroundColor =
            e.target.style.backgroundColor === '' ? '#90EE90' : '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateResult();

        addQuizMark({
            student_id: studentId,
            student_name: studentName,
            video_id: parseInt(videoId),
            video_title: video.title,
            totalQuiz: concernedQuizzes.length,
            totalCorrect: quizMark / 5,
            totalWrong: concernedQuizzes.length - quizMark / 5,
            totalMark: concernedQuizzes.length * 5,
            mark: quizMark,
        });

        navigate(`/leader-board`);
    };

    let content = null;
    if (
        !videoIsLoading &&
        !videoIsError &&
        !quizzesIsLoading &&
        !quizzesIsError &&
        quizzes.length > 0
    ) {
        content = concernedQuizzes.map((quiz, index) => (
            <div key={quiz.id} className="quiz">
                <h4 className="question">
                    Quiz {index + 1} - {quiz.question}
                </h4>
                <form className="quizOptions">
                    {/* <!-- Option 1 --> */}
                    <label
                        for={`option1_q${index + 1}`}
                        onClick={(e) => handleColorChange(e)}
                    >
                        <input
                            type="checkbox"
                            id={`option1_q${index + 1}`}
                            onChange={(e) =>
                                handleChange(e.target.checked, quiz.question, quiz.options[0])
                            }
                        />
                        {quiz.options[0].option}
                    </label>

                    {/* <!-- Option 2 --> */}
                    <label
                        for={`option2_q${index + 1}`}
                        onClick={(e) => handleColorChange(e)}
                    >
                        <input
                            type="checkbox"
                            id={`option2_q${index + 1}`}
                            onChange={(e) =>
                                handleChange(e.target.checked, quiz.question, quiz.options[1])
                            }
                        />
                        {quiz.options[1].option}
                    </label>

                    {/* <!-- Option 3 --> */}
                    <label
                        for={`option3_q${index + 1}`}
                        onClick={(e) => handleColorChange(e)}
                    >
                        <input
                            type="checkbox"
                            id={`option3_q${index + 1}`}
                            onChange={(e) =>
                                handleChange(e.target.checked, quiz.question, quiz.options[2])
                            }
                        />
                        {quiz.options[2].option}
                    </label>

                    {/* <!-- Option 4 --> */}
                    <label
                        for={`option4_q${index + 1}`}
                        onClick={(e) => handleColorChange(e)}
                    >
                        <input
                            type="checkbox"
                            id={`option4_q${index + 1}`}
                            onChange={(e) =>
                                handleChange(e.target.checked, quiz.question, quiz.options[3])
                            }
                        />
                        {quiz.options[3].option}
                    </label>
                </form>
            </div>
        ));
    }

    return (
        <StudentLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Quizzes for "{video?.title}"</h1>
                <p className="text-sm text-slate-200">
                    Each question contains 5 Mark
                </p>
            </div>
            <div className="space-y-8">{content}</div>

            <button
                disabled={isLoading}
                onClick={(e) => handleSubmit(e)}
                className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
            >
                Submit
            </button>
        </StudentLayout>
    );
}
