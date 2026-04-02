import type { ConnectionStats as Stats } from "@/types/connection.types";
import StatusCard from "../common/status-card";
import { CheckIcon, Hourglass, Info, Layers } from "lucide-react";

export default function ConnectionStats({stats}:{stats:Stats}) {
  return (
    <section className="flex flex-wrap md:flex-nowrap items-center gap-4">
      <StatusCard
        title="Active"
        icon={CheckIcon}
        value={stats?.active}
        iconClassName="bg-green-200 text-green-700"
      />
      <StatusCard
        title="Pending"
        icon={Hourglass}
        value={stats?.pending}
        iconClassName="bg-yellow-200 text-yellow-700"
      />
      <StatusCard
        title="Issues"
        icon={Info}
        value={stats?.issus}
        iconClassName="bg-red-100 text-red-700"
      />
      <StatusCard
        title="Total"
        icon={Layers}
        value={stats?.total}
        iconClassName="bg-gray-200 text-gray-600"
      />
    </section>
  );
}
