import { useNavigate } from "react-router-dom";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { useAddAssignmentMutation } from "../../features/assignments/assignmentsApi";
import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";


export default function AddAssignment() {
  const navigate = useNavigate();



  const {
    data: videos,
    isLoading: videoIsLoading,
    isError: videoIsError,
  } = useGetVideosQuery();

  const [addAssignment, { isLoading, error }] = useAddAssignmentMutation();

  const [title, setTitle] = useState('');
  const [video, setVideo] = useState({});
  const [totalMark, setTotalMark] = useState(0);

  // const status = 'pending';

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment({
      title,
      totalMark,
      video_id: video.id,
      video_title: video.title,
    });

    navigate('/admin/assignment');
  };

  return (
    <AdminLayout>
      <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="name"
              autocomplete="name"
              required
              className="login-input rounded-t-md"
              placeholder="Assignment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label for="video" className="sr-only">
              Associated Video
            </label>
            <select
              name="associatedVideo"
              required
              style={{
                color: 'white',
                width: '100%',
                backgroundColor: 'rgb(30 41 59 / var(--tw-bg-opacity))',
                height: '40px',
                fontSize: '0.875rem',
              }}
              onChange={(e) =>
                setVideo(
                  videos.find((video) => video.title === e.target.value)
                )
              }
            >
              <option value="" hidden selected>
              </option>
              {!videoIsLoading &&
                !videoIsError &&
                videos.map((video) => (
                  <option key={video.id}>{video.title}</option>
                ))}
            </select>
          </div>

          <div>
            <label for="Marks" className="sr-only">
              Total Marks
            </label>
            <input
              id="marks"
              name="marks"
              type="number"
              autocomplete="marks"
              required
              className="login-input rounded-b-md"
              placeholder="Total Marks"
              // value={totalMark}
              onChange={(e) => setTotalMark(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Add Assignment
          </button>
        </div>
        {<div style={{ color: 'white' }}>{error !== '' && error}</div>}
      </form>
    </AdminLayout>


  );
}
