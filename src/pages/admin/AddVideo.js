import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAddVideoMutation } from '../../features/videos/videosApi';


export default function AddVideo() {

  const navigate = useNavigate();

  const [addVideo, { isLoading, error }] = useAddVideoMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [views, setViews] = useState('');
  const [duration, setDuration] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      title,
      description,
      url,
      views,
      duration,
      createdAt: new Date(createdAt).toISOString(),
    });

    navigate('/admin/videos');
  };

  return (
    <AdminLayout>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Add New Video
        </h2>
      </div>
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
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label for="description" className="sr-only">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="description"
              autocomplete="description"
              required
              className="login-input"
              placeholder="Video Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label for="url" className="sr-only">
              Url
            </label>
            <input
              id="url"
              name="url"
              type="url"
              autocomplete="url"
              required
              className="login-input"
              placeholder="Video Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label for="views" className="sr-only">
              Views
            </label>
            <input
              id="views"
              name="views"
              type="text"
              autocomplete="views"
              required
              className="login-input rounded-b-md"
              placeholder="Views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />
          </div>
          <div>
            <label for="duration" className="sr-only">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="name"
              autocomplete="duration"
              required
              className="login-input rounded-b-md"
              placeholder="Video Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label for="createdAt" className="sr-only">
              Created At
            </label>
            <input
              style={{ color: 'gray' }}
              id="createdAt"
              name="createdAt"
              type="date"
              autocomplete="createdAt"
              required
              className="login-input rounded-b-md"
              placeholder="Created At"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Add Video
          </button>
        </div>
        {<div style={{ color: 'white' }}>{error !== '' && error}</div>}
      </form>
    </AdminLayout>


  );
}
