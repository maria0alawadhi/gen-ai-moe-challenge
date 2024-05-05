'use client';

import Button from './FButton';
import CircularBar from './circularProgressBar';

const resumeCard = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
  return (
    <div className=" w-[28rem] h-96 bg-white rounded-lg hover:w-[30rem] hover:h-[26rem] duration-500">
      <div className="w-full h-1/6 flex justify-center items-center">
        <h3 className="text-3xl font-bold text-center max-sm:text-lg">
          {title}
        </h3>
      </div>

      <div className="w-full h-4/6 flex justify-center items-center">
        <CircularBar percentage={percentage} circleWidth={110} />
      </div>

      <div className="w-full h-1/6 flex justify-center items-center">
        <Button label="Resume" tag="3B828E" />
      </div>
    </div>
  );
};

export default resumeCard;
