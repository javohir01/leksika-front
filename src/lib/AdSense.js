import React, { useEffect } from 'react';

const AdsComponent = (props) => {



    useEffect(() => {

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    }, []);



    return (
        <>
            <ins className="adsbygoogle"
                style={{display:"block"}}
                data-ad-client="ca-pub-8555908314454713"
                data-ad-slot="6110794033"
                data-ad-format={"auto"}
                data-full-width-responsive="true"></ins>
        </>
    );
};

export default AdsComponent;