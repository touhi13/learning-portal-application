import { useSelector } from 'react-redux'
import StudentLayout from '../../components/layout/StudentLayout'
import LeaderboardList from '../../components/leaderboard/LeaderboardList'
import Position from '../../components/leaderboard/Position'
import { useEffect, useState } from 'react'
import { useGetAssignmentDataQuery, useGetLeaderBoardDataQuery } from '../../features/leader-board/leaderBoardApi'

const Leaderboard = () => {
  const auth = useSelector((state) => state.auth)
  console.log({ auth: auth?.user?.id })

  const [leaderBoard, setLeaderBoard] = useState([]);
  const [userData, setUserData] = useState({})
  const [rankData, setRankData] = useState([])
  console.log({ leaderBoard, userData, rankData })
  const { data: leaderBoardData, isLoading, isError, error } = useGetLeaderBoardDataQuery();
  const { data: assignmentData, isLoading: assignmentIsLoading, isError: assignmentIsError, error: assignmentError } = useGetAssignmentDataQuery();

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading && assignmentIsLoading) {
      <p>loading.....</p>
    } else {
      setLeaderBoard(leaderBoardData);
      const findUserData = leaderBoardData?.find((content) => content?.student_id === auth?.user?.id)
      setUserData(findUserData)
      const namesArray = leaderBoardData?.map(obj => obj.mark + assignmentData?.find((row) => row.id === obj.assignment_id)?.totalMark);
      setRankData(namesArray)
    }

  }, [leaderBoardData, assignmentData, isLoading, assignmentIsLoading, auth?.user?.id])



  return (
    <StudentLayout>
      <Position assignmentData={assignmentData} userData={userData} rankData={rankData} />
      {
        leaderBoard.map((row, i) => (
          <LeaderboardList row={row} rankData={rankData}/>

        ))
      }

    </StudentLayout>
  )
}

export default Leaderboard