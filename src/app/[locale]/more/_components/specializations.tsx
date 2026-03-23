"use client";

import {
  Desktop,
  ChartBar,
  ShieldCheck,
  GlobeHemisphereWest as GlobeIcon,
  DeviceMobile,
  PenNib,
  Brain as BrainIcon,
  GameController,
  Cloud as CloudIcon,
  TrendUp,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const SPECIALIZATIONS = [
  { key: "computer-science",        icon: Desktop },
  { key: "data-science",            icon: ChartBar },
  { key: "cybersecurity",           icon: ShieldCheck },
  { key: "web-development",         icon: GlobeIcon },
  { key: "mobile-development",      icon: DeviceMobile },
  { key: "ui-ux-design",            icon: PenNib },
  { key: "artificial-intelligence", icon: BrainIcon },
  { key: "game-development",        icon: GameController },
  { key: "cloud-computing",         icon: CloudIcon },
  { key: "business-it",             icon: TrendUp },
];

export default function SpecializationsGrid() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
      {SPECIALIZATIONS.map((spec, index) => {
        const Icon = spec.icon;
        return (
          <div
            key={index}
            className="group flex flex-col items-center gap-3 p-4 rounded-2xl  border border-primary/20 dark:bg-[#0e4a38] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:hover:shadow-primary cursor-default hover:-translate-y-1"
          >
            <div className="p-2 transition-colors duration-300">
              <Icon className="size-10" weight="light" />
            </div>
            <span className="text-xs font-medium text-center text-brand-900 dark:text-brand-100 leading-tight">
              {t(`data.specializations.${spec.key}.name`)}
            </span>
          </div>
        );
      })}
    </div>
  );
}