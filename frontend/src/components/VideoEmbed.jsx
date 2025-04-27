import React from 'react';

const VideoEmbed = () => {
  return (
    <div className='video-wrapper'>
      <div className='video-container'>
        <iframe
          src="https://vk.com/video_ext.php?oid=-211095776&id=456239221&hash=8d6f22975045c475"
          title="VK Video"
          frameBorder="0"
          allow="encrypted-media; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoEmbed;