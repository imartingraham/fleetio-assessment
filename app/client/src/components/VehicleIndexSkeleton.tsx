import React from "react";

import { SkeletonCard } from "../ui/SkeletonCard";

export const VehicleIndexSkeleton = () =>
  [...Array(8).keys()].map((key) => <SkeletonCard key={key} />);
