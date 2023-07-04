import React from 'react';
import brandImgsdata from '../image-folder/brands/brandImgsdata';
export default function Brands() {
  return (
    <div className="mx-2">
      {brandImgsdata.map((item, index) => (
        <div key={index}>
          <img src={item.imgSrc} alt={`banner${index}`} />
          <video autoPlay={true} loop={true} playsInline={false} muted={true}>
            <source src={item.videoSrc} type="video/mp4"></source>
          </video>
        </div>
      ))}
    </div>
  );
}
