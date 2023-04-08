import React from 'react'
import LeaderboardItem from './LeaderboardItem'
import findAssignmentMark from '../../utils/findAssignmentMark';
import getRank from '../../utils/getRank';

export default function LeaderboardList({ leaderBoard, assignmentData, rankData }) {

    return (
        <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                <thead>
                    <tr className="border-b border-slate-600/50">
                        <th className="table-th !text-center">Rank</th>
                        <th className="table-th !text-center">Name</th>
                        <th className="table-th !text-center">Quiz Mark</th>
                        <th className="table-th !text-center">Assignment Mark</th>
                        <th className="table-th !text-center">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {[...leaderBoard].sort((a, b) => {
                        const aScore = a.mark + findAssignmentMark(a.assignment_id, assignmentData);
                        const bScore = b.mark + findAssignmentMark(b.assignment_id, assignmentData);
                        const aRank = getRank(aScore, rankData);
                        const bRank = getRank(bScore, rankData);
                        return aRank - bRank;
                    })
                        .map((row, i) => (
                            <LeaderboardItem row={row} assignmentData={assignmentData} rankData={rankData} key={row.id} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
