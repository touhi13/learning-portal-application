import { useParams } from 'react-router-dom';
import { useGetVideoQuery } from '../../features/videos/videosApi';
import VideoForm from '../../components/form/video/VideoForm';
import AdminLayout from '../../components/layout/AdminLayout';


export default function EditVideo() {

  const { videoId } = useParams();
  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && video?.id) {
    content = <VideoForm video={video} />;
  }

  return (
    <AdminLayout>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Video
        </h2>
      </div>
      {content}
    </AdminLayout>
  );
}
