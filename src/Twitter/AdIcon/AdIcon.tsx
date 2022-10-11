import React, { useEffect } from 'react';
import './AdIcon.css';
import { Popover, Card, Image } from 'antd';
import { useState } from 'react';
import Advertisement from '../Advertisement/Advertisement';
import { formatBalance } from '@polkadot/util';

export interface AdIconProps {
    href: string;
    ad?: any;
    avatarSrc?: string;
}

const defaultAdIcon = chrome.runtime.getURL('icons/logo-round-core.svg');

function AdIcon({ href, ad, avatarSrc }: AdIconProps) {

    // const [userDid, setUserDid] = useState<string>(ad?.userDid);
    // const [tokenPrice, setTokenPrice] = useState<string>('');

    const content = (
        ad ? <Advertisement ad={ad} avatarSrc={avatarSrc} ></Advertisement> : null
    );

    if (ad?.adClaimed || ad?.insufficientBalance) {
        return null;
    }

    // todo: fix communication between content scripts
    // useEffect(() => {
    //     chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //         if (request.method === 'didChange') {
    //             setUserDid(request.didHex);
    //         }
    //         return true;
    //     })
    // }, []);

    // useEffect(() => {
    //     const priceWithUnit = formatBalance(ad?.tokenPrice ?? '123400000000000000000', { withUnit: 'AD3', decimals: 18 });
    //     const [price, unit] = priceWithUnit.split(' ');
    //     const tokenPrice = `${parseFloat(price).toFixed(1)} ${unit}`;
    //     setTokenPrice(tokenPrice);
    // }, [ad])

    return <div className='pfp-link-badge-container'>
        <Popover content={content} placement="rightTop" className='ad-popover'>
            <a className='pfp-link-badge' target="_blank"
                href={href}
            >
                <img referrerPolicy='no-referrer' src={ad?.icon ?? defaultAdIcon}></img>
            </a>
        </Popover>

        {/* {!!tokenPrice && <div className='priceInfo'>
            <span className='price'>{tokenPrice}</span>
            <span className='priceChange'>+120%</span>
        </div>} */}
    </div>;
};

export default AdIcon;