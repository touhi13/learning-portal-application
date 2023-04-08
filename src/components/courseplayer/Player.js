import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetVideoQuery } from '../../features/videos/videosApi';
import formatDate from '../../utils/formatDate';
import AssignmentModal from './AssignmentModal';
import { useGetAssignmentMarksQuery } from '../../features/assignmentMarks/assignmentMarksApi';
import { useSelector } from 'react-redux';
import { useGetAssignmentsQuery } from '../../features/assignments/assignmentsApi';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi';

export default function Player() {
    const { videoId } = useParams();
    const auth = useSelector((state) => state.auth);

    const {
        data: video,
        isLoading: videoIsLoading,
        isError: videoIsError,
    } = useGetVideoQuery(videoId);

    const {
        data: assignments,
        isLoading: assignmentsIsLoading,
        isError: assignmentsIsError,
    } = useGetAssignmentsQuery();

    const {
        data: assignmentMarks,
        isLoading: assignmentMarksIsLoading,
        isError: assignmentMarksIsError,
    } = useGetAssignmentMarksQuery();
    const {
        data: quizzes,
        isLoading: quizzesIsLoading,
        isError: quizzesIsError,
    } = useGetQuizzesQuery();

    const {
        data: quizMarks,
        isLoading: quizMarksIsLoading,
        isError: quizMarksIsError,
    } = useGetQuizMarksQuery();



    const [assignment, setAssignment] = useState({});
    const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);

    const controlAssignmentModal = (assignmentData) => {
        setAssignmentModalOpened((prevState) => !prevState);
        setAssignment(assignmentData);
    };
    const decideAssignmentButton = (assignment) => {
        const { id: assignment_id } = assignment;
        if (
            !assignmentMarksIsLoading &&
            !assignmentMarksIsError &&
            assignmentMarks?.length > 0
        ) {
            const cancelSubmission = assignmentMarks.find(
                (assignment) =>
                    assignment.assignment_id == assignment_id &&
                    assignment.student_id == auth?.user?.id
            );
            console.log(cancelSubmission);
            return cancelSubmission ? true : false;
        }
    };
    let assignmentButton = null;

    if (
        !videoIsLoading &&
        !videoIsError &&
        !assignmentsIsLoading &&
        !assignmentsIsError &&
        assignments?.length > 0
    ) {
        const selectedAssignment = assignments.find(
            (assignment) => assignment.video_id == video.id
        );

        let decision;
        if (selectedAssignment)
            decision = decideAssignmentButton(selectedAssignment);

        assignmentButton = selectedAssignment ? (
            <button
                onClick={() => controlAssignmentModal(selectedAssignment)}
                disabled={decision}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
                এসাইনমেন্ট
            </button>
        ) : null;
    }
    const decideQuizButton = (quiz) => {
        const { video_id: quizVideoId } = quiz;

        if (!quizMarksIsLoading && !quizMarksIsError && quizMarks?.length > 0) {
            const cancelSubmission = quizMarks.find(
                (quiz) => quiz.video_id == quizVideoId && quiz.student_id == auth?.user?.id
            );
            return cancelSubmission ? true : false;
        }
    };

    const navigate = useNavigate();

    let quizButton = null;

    if (
        !videoIsLoading &&
        !videoIsError &&
        !quizzesIsLoading &&
        !quizzesIsError &&
        quizzes?.length > 0
    ) {
        const selectedQuiz = quizzes.find(
            (quiz) => quiz.video_id == video.id
        );

        let decision;
        if (selectedQuiz) decision = decideQuizButton(selectedQuiz);

        quizButton = selectedQuiz ? (
            <button
                disabled={decision}
                onClick={() => navigate(`/quiz/${video.id}`)}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
                কুইজে অংশগ্রহণ করুন
            </button>
        ) : null;
    }

    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <AssignmentModal
                open={assignmentModalOpened}
                control={controlAssignmentModal}
                assignment={assignment}
            />
            <iframe width="100%" className="aspect-video" src={video?.url}
                title={video?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {video?.title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    {
                        formatDate(video?.createdAt)
                    }
                </h2>

                <div className="flex gap-4">
                    {assignmentButton}
                    {quizButton}
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                    {video?.description}
                </p>


            </div>
        </div>
    )
}
