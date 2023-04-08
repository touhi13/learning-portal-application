import React from 'react'
import getRank from '../../utils/getRank'
import findAssignmentMark from '../../utils/findAssignmentMark'

export default function Position({ assignmentData, userData, rankData }) {
  return (
    <div>
      {/* Display the title of the section */}
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            {/* Display column headers for each field */}
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {/* Display the user's position in the leaderboard */}
          <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{getRank(userData?.mark + findAssignmentMark(userData?.assignment_id, assignmentData), rankData)}</td>
            <td className="table-td text-center font-bold">{userData?.student_name}</td>
            <td className="table-td text-center font-bold">{userData?.mark}</td>
            <td className="table-td text-center font-bold">{typeof findAssignmentMark(userData?.assignment_id, assignmentData) === 'number' ? findAssignmentMark(userData?.assignment_id, assignmentData).toString() : '-'}</td>
            <td className="table-td text-center font-bold">{typeof userData?.mark === 'number' && typeof findAssignmentMark(userData?.assignment_id, assignmentData) === 'number' ? (userData?.mark + findAssignmentMark(userData?.assignment_id, assignmentData)).toString() : '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

