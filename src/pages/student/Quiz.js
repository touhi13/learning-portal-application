/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications';
import { useGetQuizDataQuery } from '../../features/quiz/quizsApi';
import StudentLayout from '../../components/layout/StudentLayout';

const Quiz = ({ quizId }) => {
    const [quizData, setQuizData] = useState([])
    console.log({ quizId, quizData })
    const { data, isLoading, isError, error } = useGetQuizDataQuery(quizId);
    useEffect(() => {
        if (isLoading) {
            <p>Quiz Loading</p>
        } else if (error) {
            NotificationManager.error(error.data)
        } else {
            setQuizData(data)
        }

    }, [data, isLoading, error]);
    return (
        <StudentLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Quizzes for {quizData[0]?.video_title || ""}
                </h1>
                <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
            </div>
            <div className="space-y-8 ">
                {
                    quizData?.map((item, i) => (
                        <div className="quiz" >
                            <h4 className="question">{item?.question}</h4>
                            <form className="quizOptions">
                                {
                                    item?.options?.map((row) => (
                                        <label for={row?.id} key={row?.id}>
                                            <input type="checkbox" id={row?.id} value={row.isCorrecrt} />
                                            {row?.option}
                                        </label>
                                    ))
                                }
                            </form>
                        </div>
                    ))
                }
            </div>

            <button
                className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
        </StudentLayout>


    )
}

export default Quiz