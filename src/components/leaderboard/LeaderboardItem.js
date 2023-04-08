import React from 'react'
import getRank from '../../utils/getRank'
import findAssignmentMark from '../../utils/findAssignmentMark'

export default function LeaderboardItem({ row, assignmentData, rankData }) {
  return (
    <tr className="border-2 border-cyan">
      {/* Calculates the rank of the student by summing up the quiz mark and the assignment mark and getting its rank based on rankData */}
      <td className="table-td text-center font-bold">{getRank(row?.mark + findAssignmentMark(row?.assignment_id, assignmentData), rankData)}</td>
      {/* Displays the name of the student */}
      <td className="table-td text-center font-bold">{row?.student_name}</td>
      {/* Displays the quiz mark of the student */}
      <td className="table-td text-center font-bold">{row?.mark}</td>
      {/* Displays the assignment mark of the student, or a dash (-) if the value is not a number */}
      <td className="table-td text-center font-bold">{typeof findAssignmentMark(row?.assignment_id, assignmentData) === 'number' ? findAssignmentMark(row?.assignment_id, assignmentData).toString() : '-'}
      </td>
      {/* Displays the total mark of the student (quiz + assignment), or a dash (-) if any of the values are not numbers */}
      <td className="table-td text-center font-bold">{typeof row?.mark === 'number' && typeof findAssignmentMark(row?.assignment_id, assignmentData) === 'number' ? (row?.mark + findAssignmentMark(row?.assignment_id, assignmentData)).toString() : '-'}
      </td>
    </tr>
  )
}
