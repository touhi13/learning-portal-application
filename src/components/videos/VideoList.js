import React from 'react'
import VideoItem from './VideoItem'
import { useGetVideosQuery } from '../../features/videos/videosApi';

export default function VideoList() {
    const { data: videos, isLoading, isError, error } = useGetVideosQuery();
    console.log(videos)
    let content = null;
    if (isLoading) content = <tr><td colSpan={2}>Loading...</td></tr>;
    if (!isLoading && isError) content = <tr><td colSpan={2}>{error}</td></tr>;
    if (!isLoading && !isError && videos?.length === 0)
        content = <tr><td colSpan={2}>No Videos Found!</td></tr>;

    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) => (
            <VideoItem video={video} key={video.id} />

        ));
    }
    return (
        <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
                {content}
            </tbody>
        </table>

    )
}
