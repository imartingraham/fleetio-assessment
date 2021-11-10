import React from "react";

import SkeletonCard from "../ui/SkeletonCard";

const VehicleIndexSkeleton = () =>
  [...Array(8).keys()].map((key) => <SkeletonCard key={key} />);

export default VehicleIndexSkeleton;
