import React from 'react';
import styles from './HeartIcon.module.scss';

export interface HeartIconProps { }

function HeartIcon({ }: HeartIconProps) {
    return <>
        <div className={styles.iconContainer}>
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4716 4.61713C9.44296 3.64577 9.44296 2.07089 8.4716 1.09953C7.50025 0.128176 5.92537 0.128176 4.95401 1.09953L4.95314 1.1004L4.95226 1.09951C3.9809 0.128157 2.40602 0.128157 1.43467 1.09951C0.463309 2.07087 0.463308 3.64575 1.43467 4.61711L4.95226 8.1347L4.95312 8.13384L4.95401 8.13472L8.4716 4.61713Z" fill="#EC672B" />
            </svg>
        </div>
    </>;
};

export default HeartIcon;
