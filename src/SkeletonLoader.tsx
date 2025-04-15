import PropTypes from "prop-types";

const SkeletonLoader = ({ className }: { className?: string }) => {
  return (
    <div className="animate-pulse">
      <div className={`bg-gray-300 rounded-md ${className}`} />
    </div>
  );
};

SkeletonLoader.propTypes = {
  className: PropTypes.string,
};

export default SkeletonLoader;