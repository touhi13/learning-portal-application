import React from 'react'
import StudentLayout from '../../components/layout/StudentLayout'
import Player from '../../components/courseplayer/Player'
import PlayList from '../../components/courseplayer/PlayList'

export default function CoursePlayer() {
    return (
        <StudentLayout>
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
                <Player />
                <PlayList />
            </div>
        </StudentLayout>
    )
}
