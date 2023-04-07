import React from 'react'
import getRank from '../../utils/getRank'
import findAssignmentMark from '../../utils/findAssignmentMark'

export default function Position({assignmentData,userData,rankData}) {
  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{getRank(userData?.mark + findAssignmentMark(userData?.assignment_id,assignmentData), rankData)}</td>
            <td className="table-td text-center font-bold">{userData?.student_name}</td>
            <td className="table-td text-center font-bold">{userData?.mark}</td>
            <td className="table-td text-center font-bold">{findAssignmentMark(userData?.assignment_id,assignmentData)}</td>
            <td className="table-td text-center font-bold">{userData?.mark + findAssignmentMark(userData?.assignment_id,assignmentData)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
