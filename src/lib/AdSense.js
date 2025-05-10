import React, { useEffect, useRef } from 'react';
import './adsComponent.css';

const AdsComponent = (props) => {
  const adRef = useRef(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    // Only try to load ads if this specific instance hasn't had an ad loaded yet
    if (adRef.current && !adLoaded.current) {
      try {
        // Load ads after component mounts
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      adLoaded.current = false;
    };
  }, []);

  return (
    <div className="adsense-container">
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8555908314454713"
        data-ad-slot="6110794033"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  );
};

export default AdsComponent;