import { Users, Car, Navigation, DollarSign } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RidesChart } from "@/components/dashboard/RidesChart";
import { ActivityMap } from "@/components/dashboard/ActivityMap";
import { RecentRidesTable } from "@/components/dashboard/RecentRidesTable";

const stats = [
  {
    title: "Total Users",
    value: "24,589",
    change: 12.5,
    icon: Users,
    iconColor: "bg-primary/10 text-primary",
  },
  {
    title: "Active Drivers",
    value: "1,847",
    change: 8.2,
    icon: Car,
    iconColor: "bg-success/10 text-success",
  },
  {
    title: "Ongoing Rides",
    value: "342",
    change: -3.1,
    icon: Navigation,
    iconColor: "bg-warning/10 text-warning",
  },
  {
    title: "Total Revenue",
    value: "$847,290",
    change: 15.3,
    icon: DollarSign,
    iconColor: "bg-chart-4/10 text-chart-4",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with RideMate today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 50} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RidesChart />
        <ActivityMap />
      </div>

      {/* Recent Rides Table */}
      <RecentRidesTable />
    </DashboardLayout>
  );
};

export default Index;
