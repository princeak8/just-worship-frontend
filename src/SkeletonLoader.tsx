import PropTypes from "prop-types";
import { CSSProperties } from "react";

interface SkeletonLoaderProps {
  className?: string;
  style?: CSSProperties;
}

const SkeletonLoader = ({ className, style }: SkeletonLoaderProps) => {
  return (
    <div className="animate-pulse">
      <div className={`bg-gray-300 rounded-md ${className}`} style={style} />
    </div>
  );
};

SkeletonLoader.propTypes = {
  className: PropTypes.string,
};

export default SkeletonLoader;