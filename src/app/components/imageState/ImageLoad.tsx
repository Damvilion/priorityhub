/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '@nextui-org/react';

interface ImageLoadProps {
    imgUrl: string;
}

const ImageLoad = ({ imgUrl }: ImageLoadProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.onload = () => {
                setImageLoaded(true);
            };
        }
    }, [imgUrl]);

    return (
        <>
            {!imageLoaded ? (
                <div className='flex items-center justify-center'>
                    <Spinner color='secondary' />
                    <img
                        ref={imgRef}
                        alt='picture'
                        className={`w-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
                        src={imgUrl}
                    />
                </div>
            ) : (
                <img
                    ref={imgRef}
                    alt='picture'
                    className={`w-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
                    src={imgUrl}
                />
            )}
        </>
    );
};

export default ImageLoad;
