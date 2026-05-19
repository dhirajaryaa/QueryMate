import { cn } from "@/lib/utils";
import { Database, MessageSquare, Zap } from "lucide-react";
import React from "react";

interface StepProps {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  accentClass: string;
}

function StepCard({ num, icon, title, desc, accentClass }: StepProps) {
  return (
    <div className="p-8 border-border bg-card hover:scale-102 border rounded-xl transition-colors duration-200 group">
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-5">
        {num}
      </div>
      <div
        className={cn(
          `w-10 h-10 rounded-lg flex items-center justify-center border-[3px] mb-5`,
          accentClass,
        )}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm md:text-[15px] text-muted-foreground  leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function HowItWork() {
  return (
    <section id="how" className="relative z-10 py-24 px-6 mt-20">
      <div className=" mx-auto">
        <div className="mb-14 text-center">
          <span className="text-[11px] text-primary uppercase tracking-[.18em] mb-3">
            // How it works
          </span>
          <h2 className="font-display font-black text-foreground tracking-tight leading-[1.08] mb-4 text-3xl sm:text-4xl">
            Three steps. Zero complexity.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-center">
            QueryMate handles the hard parts so you can focus on insights, not
            syntax.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StepCard
            num="Step 01"
            title="Connect your DB"
            accentClass="bg-green-100 border-green-400 text-green-600"
            icon={<Database className="size-5" />}
            desc="Paste your connection string. QueryMate reads your schema automatically — tables, columns, relationships, all of it."
          />
          <StepCard
            num="Step 02"
            title="Ask in plain English"
            accentClass="bg-rose-100 border-rose-400 text-rose-600"
            icon={<MessageSquare className="size-5" />}
            desc="Type naturally. 'Show revenue by region last quarter' or 'Find users who haven't ordered in 60 days.'"
          />
          <StepCard
            num="Step 03"
            title="Get instant answers"
            accentClass="bg-amber-100 border-amber-400 text-amber-600"
            icon={<Zap className="size-5" />}
            desc="AI runs the query, streams results real-time, and explains what it found. Follow up conversationally."
          />
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
