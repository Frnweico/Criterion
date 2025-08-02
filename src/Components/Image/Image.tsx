import { useEffect, useRef, useState } from 'react';
import { Blurhash } from 'react-blurhash';

type ImageProps = {
	src: string;
	alt: string;
	hash: string;
	loading: 'eager' | 'lazy';
	height?: number;
	width?: number;
	className?: string;
	containerClassName?: any;
	adaptToParentDimensions?: boolean;
};

const Image = ({
	src,
	alt,
	hash,
	loading,
	width,
	height,
	className,
	containerClassName = {},
	adaptToParentDimensions,
}: ImageProps) => {
	// States
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const [imageIsLoaded, setImageIsLoaded] = useState(false);

	useEffect(() => {
		const img: HTMLImageElement = document.createElement('img');
		img.onload = () => {
			setImageIsLoaded(true);
		};

		img.src = src;
		img.alt = alt;

		// eslint-disable-next-line
	}, [src]);

	useEffect(() => {
		if (adaptToParentDimensions) {
			const updateDimensions = () => {
				if (containerRef.current) {
					const { clientWidth } = containerRef.current;
					setDimensions({ width: clientWidth, height: height as number });
				}
			};

			updateDimensions();
			window.addEventListener('resize', updateDimensions);

			return () => {
				window.removeEventListener('resize', updateDimensions);
			};
		} else {
			dimensions.width = width as number;
			dimensions.height = height as number;
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height: 'auto',
				overflow: 'hidden',
				...containerClassName,
			}}>
			{!imageIsLoaded ? (
				<Blurhash
					hash={hash}
					width={dimensions.width}
					height={dimensions.height}
					resolutionX={32}
					resolutionY={32}
					punch={1}
					className={className as string}
				/>
			) : (
				<img
					src={src}
					alt={alt}
					loading={loading || 'lazy'}
					className={className as string}
				/>
			)}
		</div>
	);
};

export default Image;
