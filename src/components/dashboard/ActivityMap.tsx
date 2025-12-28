import { MapPin } from "lucide-react";

const hotspots = [
  { id: 1, name: "Downtown", activity: "high", x: 45, y: 35 },
  { id: 2, name: "Airport", activity: "high", x: 75, y: 25 },
  { id: 3, name: "Mall District", activity: "medium", x: 30, y: 55 },
  { id: 4, name: "University", activity: "medium", x: 60, y: 60 },
  { id: 5, name: "Tech Park", activity: "high", x: 55, y: 45 },
  { id: 6, name: "Suburbs", activity: "low", x: 20, y: 30 },
  { id: 7, name: "Harbor", activity: "low", x: 80, y: 70 },
];

const activityColors = {
  high: "bg-primary animate-pulse-soft",
  medium: "bg-warning",
  low: "bg-muted-foreground/50",
};

const activitySizes = {
  high: "w-6 h-6",
  medium: "w-4 h-4",
  low: "w-3 h-3",
};

export function ActivityMap() {
  return (
    <div className="stat-card animate-fade-in" style={{ animationDelay: "250ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Ride Activity Heatmap</h3>
          <p className="text-sm text-muted-foreground">Live activity across the city</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
        </div>
      </div>
      <div className="relative h-[300px] bg-secondary/50 rounded-xl overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Hotspots */}
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div
              className={`rounded-full ${activityColors[spot.activity as keyof typeof activityColors]} ${activitySizes[spot.activity as keyof typeof activitySizes]} flex items-center justify-center`}
            >
              <div className="w-2 h-2 rounded-full bg-card" />
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                {spot.name}
              </div>
            </div>
          </div>
        ))}

        {/* Roads simulation */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="currentColor" strokeWidth="2" />
          <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="currentColor" strokeWidth="2" />
          <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="currentColor" strokeWidth="2" />
          <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="2" />
          <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
