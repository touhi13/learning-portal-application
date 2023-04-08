import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import VideoList from '../../components/videos/VideoList'

const Videos = () => {

    return (
        <AdminLayout>
            <div className="px-3 py-20 bg-opacity-10">
                <div className="w-full flex">
                    <button className="btn ml-auto">Add Video</button>
                </div>
                <div className="overflow-x-auto mt-4">
                <VideoList />

                </div>
            </div>
        </AdminLayout>

    )
}

export default Videos