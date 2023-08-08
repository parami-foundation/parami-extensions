import React, { useEffect } from 'react';
import './AdIcon.css';
// import { HnftBadge } from 'hyperlink-nft-badge';
import HnftBadge from '../HnftBadge/HnftBadge';

export interface AdIconProps {
    avatarSrc: string;
}

function AdIcon({ avatarSrc }: AdIconProps) {
    const regex = /_(bigger|\d+x\d+)\.jpg$/;
    const imageUrl = (avatarSrc ?? '').replace(regex, '_normal.jpg');

    return <div className='pfp-link-badge-container'>
        <div className='pfp-link-badge'>
            {/* hahaha */}
            <HnftBadge hnftImageUrl={imageUrl}></HnftBadge>
        </div>
    </div>;
};

export default AdIcon;
