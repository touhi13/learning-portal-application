import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetVideoQuery } from '../../features/videos/videosApi';
import formatDate from '../../utils/formatDate';
import AssignmentModal from './AssignmentModal';
import { useGetAssignmentMarksQuery } from '../../features/assignmentMarks/assignmentMarksApi';
import { useSelector } from 'react-redux';
import { useGetAssignmentsQuery } from '../../features/assignments/assignmentsApi';

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

    const [assignment, setAssignment] = useState({});
    const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);

    const controlAssignmentModal = (assignmentData) => {
        setAssignmentModalOpened((prevState) => !prevState);
        setAssignment(assignmentData);
    };
    // decide on disablity of assignment button
    const decideAssignmentButton = (assignment) => {
        const { id: assignment_id } = assignment;
// console.log(assignment)
        if (
            !assignmentMarksIsLoading &&
            !assignmentMarksIsError &&
            assignmentMarks?.length > 0
        ) {
            // console.log("jii")
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

                    <a href="./Quiz.html"
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                        অংশগ্রহণ
                        করুন
                    </a>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                    {video?.description}
                </p>


            </div>
        </div>
    )
}
