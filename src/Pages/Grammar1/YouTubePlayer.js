import React from 'react';
import PropTypes from 'prop-types';

const YouTubePlayer = ({ videoId }) => {
  console.log('videoId1',videoId);
  
  return (
    <div className="video-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="video"
        width="100%"
        height="600"
        style={{
          maxWidth: "100%",
          borderRadius: "18px"
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

YouTubePlayer.propTypes = {
  videoId: PropTypes.string.isRequired
};

export default YouTubePlayer;