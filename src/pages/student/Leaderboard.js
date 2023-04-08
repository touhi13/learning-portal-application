import { useSelector } from 'react-redux'
import StudentLayout from '../../components/layout/StudentLayout'
import LeaderboardList from '../../components/leaderboard/LeaderboardList'
import Position from '../../components/leaderboard/Position'
import { useEffect, useState } from 'react'
import { useGetAssignmentDataQuery, useGetLeaderBoardDataQuery } from '../../features/leader-board/leaderBoardApi'

const Leaderboard = () => {
  // Accessing the auth state from the Redux store
  const auth = useSelector((state) => state.auth)

  // Declaring some state variables to hold the data from the leaderBoard and assignment API queries
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [userData, setUserData] = useState({})
  const [rankData, setRankData] = useState([])
  console.log({ leaderBoard, userData, rankData })

  // Fetching data from the leaderBoard and assignment APIs using the useGetLeaderBoardDataQuery and useGetAssignmentDataQuery hooks from the leaderBoardApi module
  const { data: leaderBoardData, isLoading, isError, error } = useGetLeaderBoardDataQuery();
  const { data: assignmentData, isLoading: assignmentIsLoading, isError: assignmentIsError, error: assignmentError } = useGetAssignmentDataQuery();

  // Adding a loading indicator while the data is being fetched
  useEffect(() => {
    if (isLoading && assignmentIsLoading) {
      <p>loading.....</p>
    } else {
      // Once the data has been fetched, updating the state variables with the appropriate data
      setLeaderBoard(leaderBoardData);
      const findUserData = leaderBoardData?.find((content) => content?.student_id === auth?.user?.id)
      setUserData(findUserData)
      const namesArray = leaderBoardData?.map(obj => obj.mark + assignmentData?.find((row) => row.id === obj.assignment_id)?.totalMark);
      setRankData(namesArray)
    }

  }, [leaderBoardData, assignmentData, isLoading, assignmentIsLoading, auth?.user?.id])

  // Rendering the StudentLayout component along with the LeaderboardList and Position components once the data has been fetched
  return (
    <StudentLayout>
      {
        isLoading || assignmentIsLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Position assignmentData={assignmentData} userData={userData} rankData={rankData} />
            <LeaderboardList leaderBoard={leaderBoard} rankData={rankData} assignmentData={assignmentData} />

          </>
        )
      }
    </StudentLayout>
  )
}

export default Leaderboard
