import React from 'react'
import getRank from '../../utils/getRank'
import findAssignmentMark from '../../utils/findAssignmentMark'

export default function LeaderboardItem({row,rankData}) {
  return (
    <tr className="border-b border-slate-600/50">
    <td className="table-td text-center">{getRank(row?.mark + findAssignmentMark(row?.assignment_id), rankData)}</td>
    <td className="table-td text-center">{row?.student_name}</td>
    <td className="table-td text-center">{row?.mark}</td>
    <td className="table-td text-center">{findAssignmentMark(row?.assignment_id)}</td>
    <td className="table-td text-center">{row?.mark + findAssignmentMark(row?.assignment_id)}</td>
  </tr>
  )
}
