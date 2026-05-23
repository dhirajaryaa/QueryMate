import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Clock,
  Database,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

interface FeatProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
  badgeVariant?: "default" | "secondary" | "outline";
}

function FeatCard({
  icon,
  title,
  desc,
  badge,
  badgeVariant = "secondary",
}: FeatProps) {
  return (
    <div className="p-8 border-border bg-card hover:scale-101 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden border rounded-lg">
      <div className="w-10 h-10 rounded-lg bg-muted/90 border border-primary/20 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold md:text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-4">
        {desc}
      </p>
      <Badge
        variant={badgeVariant}
        className="text-[10px] md:text-xs px-4 py-1 uppercase tracking-wider"
      >
        {badge}
      </Badge>
    </div>
  );
}

function Feature() {
  const featuresList: FeatProps[] = [
    {
      icon: <Database className="size-5" />,
      title: "AI Agent with DB Tools",
      badge: "Powered by Claude",
      badgeVariant: "default",
      desc: "The agent understands your schema, picks the right tables, joins them correctly, and explains its reasoning.",
    },
    {
      icon: <Zap className="size-5" />,
      title: "Real-time Streaming",
      badge: "AI SDK",
      badgeVariant: "secondary",
      desc: "Results stream token-by-token. No waiting for a full response — see data appear as the query runs.",
    },
    {
      icon: <BarChart3 className="size-5" />,
      title: "Schema Awareness",
      badge: "Auto-detected",
      badgeVariant: "outline",
      desc: "Reads your full schema on connect — foreign keys, indexes, data types. No hints needed from you.",
    },
    {
      icon: <Clock className="size-5" />,
      title: "Query History & Memory",
      badge: "Coming Soon",
      badgeVariant: "secondary",
      desc: "Every conversation is saved. Reference past queries, build on previous results, share with your team.",
    },
    {
      icon: <Shield className="size-5" />,
      title: "Read-only Safety Mode",
      badge: "Always Safe",
      badgeVariant: "outline",
      desc: "Enable safe mode to prevent write operations. Perfect for production databases — explore without risk.",
    },
    {
      icon: <MessageSquare className="size-5" />,
      title: "Markdown Rich Results",
      badge: "React Markdown",
      badgeVariant: "secondary",
      desc: "Results render as formatted tables and charts — not raw JSON. Share screenshots that make sense.",
    },
  ];
  return (
    <section className="relative z-10  px-6 py-24 md:py-38">
      <div className="mb-14 text-center">
        <span className="text-[11px] text-primary uppercase tracking-[.18em] mb-3">
          // Features
        </span>
        <h2 className="font-display font-black text-foreground tracking-tight leading-[1.08] mb-4 text-3xl sm:text-4xl">
          Built for developers. Loved by everyone.
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-center">
          QueryMate is powerful enough for engineers, simple enough for product
          managers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {featuresList.map((feature, index) => (
          <FeatCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            badge={feature.badge}
            badgeVariant={feature.badgeVariant}
            desc={feature.desc}
          />
        ))}
      </div>
    </section>
  );
}

export default Feature;
