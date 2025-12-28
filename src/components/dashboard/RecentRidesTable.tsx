import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, DollarSign } from "lucide-react";

const recentRides = [
  {
    id: "RD-001",
    user: { name: "Sarah Johnson", avatar: "" },
    driver: { name: "Mike Chen", avatar: "" },
    from: "123 Main St",
    to: "Airport Terminal 2",
    amount: 45.50,
    status: "completed",
    time: "10 mins ago",
  },
  {
    id: "RD-002",
    user: { name: "Alex Turner", avatar: "" },
    driver: { name: "Lisa Park", avatar: "" },
    from: "Tech Park",
    to: "Downtown Mall",
    amount: 22.00,
    status: "ongoing",
    time: "5 mins ago",
  },
  {
    id: "RD-003",
    user: { name: "Emma Wilson", avatar: "" },
    driver: { name: "John Davis", avatar: "" },
    from: "University Campus",
    to: "Central Station",
    amount: 18.75,
    status: "completed",
    time: "15 mins ago",
  },
  {
    id: "RD-004",
    user: { name: "David Lee", avatar: "" },
    driver: { name: "Anna White", avatar: "" },
    from: "Harbor District",
    to: "Business Center",
    amount: 35.00,
    status: "cancelled",
    time: "20 mins ago",
  },
  {
    id: "RD-005",
    user: { name: "Maria Garcia", avatar: "" },
    driver: { name: "Tom Brown", avatar: "" },
    from: "Suburbs Mall",
    to: "City Hospital",
    amount: 28.50,
    status: "ongoing",
    time: "2 mins ago",
  },
];

const statusStyles = {
  completed: "bg-success/10 text-success border-success/20",
  ongoing: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentRidesTable() {
  return (
    <div className="stat-card animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Rides</h3>
          <p className="text-sm text-muted-foreground">Latest ride activity</p>
        </div>
        <button className="text-sm text-primary hover:underline font-medium">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Ride ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                User
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Driver
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Route
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {recentRides.map((ride) => (
              <tr
                key={ride.id}
                className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-mono text-sm font-medium">{ride.id}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={ride.user.avatar} />
                      <AvatarFallback className="bg-secondary text-xs">
                        {ride.user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{ride.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={ride.driver.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {ride.driver.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{ride.driver.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-success" />
                      <span className="text-muted-foreground truncate max-w-[120px]">
                        {ride.from}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-destructive" />
                      <span className="text-muted-foreground truncate max-w-[120px]">
                        {ride.to}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{ride.amount.toFixed(2)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant="outline"
                    className={statusStyles[ride.status as keyof typeof statusStyles]}
                  >
                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {ride.time}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
