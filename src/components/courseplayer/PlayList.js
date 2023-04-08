import React from 'react';
import PlayListItem from './PlayListItem'
import { useGetVideosQuery } from '../../features/videos/videosApi';

export default function PlayList() {
    const {
        data: videos,
        isLoading: videosIsLoading,
        isError: videosIsError,
        error: videosError,
    } = useGetVideosQuery();
    let content = null;
    if (videosIsLoading) content = <div>Loading...</div>;
    if (!videosIsLoading && videosIsError) content = <div>{videosError}</div>;
    if (!videosIsLoading && !videosIsError && videos?.length === 0)
        content = <div>No Videos Found!</div>;

    if (!videosIsLoading && !videosIsError && videos?.length > 0) {
        content = videos.map((video) => (
            <PlayListItem key={video.id} video={video} />
        ));
    }
    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
            {content}
        </div>
    )
}
