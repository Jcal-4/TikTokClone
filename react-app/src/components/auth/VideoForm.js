import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadVideo } from "../../store/uploadvideo";

import loading from '../../images/loading.gif'

function VideoForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const onUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", video);
    if (user) {
      const userId = user.id;
      console.log("uploading...");
      setImageLoading(true);
      await dispatch(uploadVideo(userId, title, description, video));
      setImageLoading(false);
      console.log("finished uploading!");
    }
  };

  const updateVideo = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form className="video_form" onSubmit={onUpload}>
      <div>
        <labe>Title</labe>
        <input
          type="text"
          name="title"
          onChange={updateTitle}
          value={title}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={updateDescription}
          value={description}
        ></input>
      </div>
      <div>
        <label>Video</label>
        <input
          type="file"
          name="video_url"
          placeholder="Select Video"
          accept="video/*"
          onChange={updateVideo}
        ></input>
      </div>
      <button type="submit">Upload</button>
      {imageLoading && 
        <div>
        <img className='loading_image' src={loading}></img>
        </div>
      }
    </form>
  );
}

export default VideoForm;
