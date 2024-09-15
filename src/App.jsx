// src/App.jsx
import { useState } from 'react';

function App() {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [notFollowingBack, setNotFollowingBack] = useState([]);

  const handleFileUpload = (event, setData) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setData(data);
    };

    reader.readAsText(file);
  };

  const findNotFollowingBack = () => {
    const followingList = following?.relationships_following?.map(f => f.string_list_data[0].value) || [];
    const followersList = followers?.map(f => f.string_list_data[0].value) || [];
    
    const notFollowingBackList = followingList.filter(followingUser => !followersList.includes(followingUser));
    setNotFollowingBack(notFollowingBackList);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-8">Pendeteksi Unfollower Instagram 🧐</h1>

      {/* Conditionally apply grid or flex layout */}
      <div className={`w-full max-w-5xl ${notFollowingBack.length > 0 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'flex justify-center'}`}>
        {/* Card for file inputs */}
        <div className="card bg-base-100 shadow-xl p-6">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Upload Following JSON:</span>
            </label>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e, setFollowing)}
              className="file-input file-input-bordered"
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Upload Followers JSON:</span>
            </label>
            <input
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e, setFollowers)}
              className="file-input file-input-bordered"
            />
          </div>

          <button
            onClick={findNotFollowingBack}
            className="btn btn-primary"
          >
            Cek
          </button>
        </div>

        {/* Card for the not following back list, shown only if there are results */}
        {notFollowingBack.length > 0 && (
          <div className="card bg-base-100 shadow-xl p-2">
            <div className="card-body">
              <h2 className="card-title">Not Following You Back:</h2>
              <ul className='max-h-96 overflow-y-auto'>
                {notFollowingBack.map((user, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{user}</span>
                    <a
                      href={`https://www.instagram.com/${user}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-accent p-2"
                    >
                      Visit Profile
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
