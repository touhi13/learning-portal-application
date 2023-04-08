import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import VideoList from '../../components/videos/VideoList'
import { useNavigate } from 'react-router-dom';

const Videos = () => {
    const navigate = useNavigate();
    return (
        <AdminLayout>
            <div className="px-3 py-20 bg-opacity-10">
                <div className="w-full flex">
                    <button className="btn ml-auto" onClick={(e) => navigate('/admin/add-video')}>Add Video</button>
                </div>
                <div className="overflow-x-auto mt-4">
                    <VideoList />

                </div>
            </div>
        </AdminLayout>

    )
}

export default Videos