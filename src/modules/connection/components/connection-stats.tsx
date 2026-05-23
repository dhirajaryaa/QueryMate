import { CheckIcon, Hourglass, Info, Layers } from "lucide-react";
import type { ConnectionStats as Stats } from "@/modules/connection/types/connection.types";
import StatusCard from "@/components/common/status-card";

export default function ConnectionStats({stats}:{stats:Stats}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4">
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
