const findAssignmentMark = (id, assignmentData) => {
    if (assignmentData) {
        const data = assignmentData?.find((row) => row.id === id)
        return data?.totalMark
    } else return 0
}
export default findAssignmentMark;
