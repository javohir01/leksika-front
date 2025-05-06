import React, { useEffect } from 'react';
import './adsComponent.css';
const AdsComponent = (props) => {

    useEffect(() => {

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        catch (e) {

        }
    }, []);

    return (
        <div className="ad-container">
            <ins className="adsbygoogle"
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