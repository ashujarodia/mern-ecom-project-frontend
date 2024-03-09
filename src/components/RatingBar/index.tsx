/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { HTMLAttributes } from 'react';
import { ErrorMessage } from '..';

type RatingBarType = React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
	Partial<{
		starCount: number;
		color: string;
		activeColor: string;
		isEditable: boolean;
		errors: any[];
		value: number;
		size: number;
	}>;

const RatingBar = ({ children, errors = [] }: RatingBarType) => {
	return (
		<>
			{/* <ReactStars
        edit={isEditable}
        classNames={className}
        count={starCount}
        isHalf={false}
        color={color}
        activeColor={activeColor}
        key={restProps.value || 1}
        {...restProps}
      /> */}
			<ErrorMessage errors={errors} />
			{children}
		</>
	);
};

export { RatingBar };
