import * as React from "react";
import type { SVGProps } from "react";

const SpaceXLogo = (props: SVGProps<SVGSVGElement>) => (
	<svg aria-hidden="true" viewBox="0 0 400 50" {...props}>
		<title>{"SpaceX Logo"}</title>
		<g className="letter_s">
			<path
				d="M37.5 30.5H10.9v-6.6h34.3c-.9-2.8-3.8-5.4-8.9-5.4H11.4c-5.7 0-9 2.1-9 6.7v4.9c0 4 3.4 6.3 8.4 6.3h26.9v7H1.5c.9 3.8 3.8 5.8 9 5.8h27.1c5.7 0 8.5-2.2 8.5-6.9v-4.9c0-4.3-3.3-6.6-8.6-6.9z"
				className="fill-white"
			/>
		</g>
		<g className="letter_p">
			<path
				d="M91.8 18.6H59v30.7h9.3V37.5h24.2c6.7 0 10.4-2.3 10.4-7.7v-3.4c-.1-5-4.3-7.8-11.1-7.8zm3 9.8c0 2.2-.4 3.4-4 3.4H68.3l.1-8h22c4 0 4.5 1.2 4.5 3.3v1.3z"
				className="fill-white"
			/>
		</g>
		<g className="letter_a">
			<path
				d="m129.9 17.3-5.6 6.9 9.5 13.1H114l-4.9 5.2h28.6l4.9 6.8h11z"
				className="fill-white"
			/>
		</g>
		<g className="letter_c">
			<path
				d="M171.4 23.9h34.8c-.9-3.6-4.4-5.4-9.4-5.4h-26c-4.5 0-8.8 1.8-8.8 6.7v17.2c0 4.9 4.3 6.7 8.8 6.7h26.3c6 0 8.1-1.7 9.1-5.8h-34.8V23.9z"
				className="fill-white"
			/>
		</g>
		<g className="letter_e">
			<path
				d="M228.3 43.5v-9.4H247v-5.2h-28.1v20.4h41.5v-5.8zM219.9 18.6h41.9V24h-41.9z"
				className="fill-white"
			/>
		</g>
		<g className="letter_x">
			<path
				d="M287.6 18.6H273l17.2 12.6c2.5-1.7 5.4-3.5 8-5l-10.6-7.6zM308.8 34.3c-2.5 1.7-5 3.6-7.4 5.4l13 9.5h14.7l-20.3-14.9z"
				className="fill-white"
			/>
		</g>
		<g className="letter_swoosh">
			<path
				d="M399 .7c-80 4.6-117 38.8-125.3 46.9l-1.7 1.6h14.8C326.8 9.1 384.3 2 399 .7z"
				className="fill-white"
			/>
		</g>
	</svg>
);

export default SpaceXLogo;
