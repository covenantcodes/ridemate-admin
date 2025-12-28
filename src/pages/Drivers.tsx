import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Car,
  Users,
  ShieldCheck,
  ShieldAlert,
  Clock,
  FileCheck,
  Star,
  MoreVertical,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const driverStats = [
  {
    title: "Total Drivers",
    value: "2,847",
    icon: Car,
    color: "primary",
  },
  {
    title: "Active Today",
    value: "1,234",
    icon: Users,
    color: "success",
  },
  {
    title: "Verified",
    value: "2,456",
    icon: ShieldCheck,
    color: "primary",
  },
  {
    title: "Pending Verification",
    value: "124",
    icon: Clock,
    color: "warning",
  },
];

const drivers = [
  {
    id: "DRV-001",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "",
    initials: "MC",
    vehicle: "Toyota Camry 2022",
    licensePlate: "ABC-1234",
    rating: 4.9,
    totalRides: 1247,
    earnings: "$34,520",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2023-03-15",
  },
  {
    id: "DRV-002",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 234-5678",
    avatar: "",
    initials: "ED",
    vehicle: "Honda Accord 2021",
    licensePlate: "XYZ-5678",
    rating: 4.8,
    totalRides: 892,
    earnings: "$24,180",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2023-05-22",
  },
  {
    id: "DRV-003",
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "+1 (555) 345-6789",
    avatar: "",
    initials: "DL",
    vehicle: "Tesla Model 3 2023",
    licensePlate: "EV-9012",
    rating: 4.7,
    totalRides: 567,
    earnings: "$18,450",
    status: "active",
    verificationStatus: "pending",
    joinDate: "2023-08-10",
  },
  {
    id: "DRV-004",
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "",
    initials: "LW",
    vehicle: "Hyundai Sonata 2022",
    licensePlate: "DEF-3456",
    rating: 4.6,
    totalRides: 423,
    earnings: "$12,890",
    status: "inactive",
    verificationStatus: "verified",
    joinDate: "2023-06-18",
  },
  {
    id: "DRV-005",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 567-8901",
    avatar: "",
    initials: "JS",
    vehicle: "Ford Fusion 2021",
    licensePlate: "GHI-7890",
    rating: 4.5,
    totalRides: 312,
    earnings: "$9,240",
    status: "active",
    verificationStatus: "rejected",
    joinDate: "2023-09-05",
  },
  {
    id: "DRV-006",
    name: "Rachel Green",
    email: "rachel.green@email.com",
    phone: "+1 (555) 678-9012",
    avatar: "",
    initials: "RG",
    vehicle: "Nissan Altima 2022",
    licensePlate: "JKL-1234",
    rating: 4.9,
    totalRides: 756,
    earnings: "$21,340",
    status: "active",
    verificationStatus: "verified",
    joinDate: "2023-04-12",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success border-0">Active</Badge>;
    case "inactive":
      return <Badge className="bg-muted text-muted-foreground border-0">Inactive</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getVerificationBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-success/10 text-success border-0 gap-1">
          <ShieldCheck className="w-3 h-3" />
          Verified
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-warning/10 text-warning border-0 gap-1">
          <Clock className="w-3 h-3" />
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-destructive/10 text-destructive border-0 gap-1">
          <ShieldAlert className="w-3 h-3" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const Drivers = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Drivers</h1>
          <p className="text-muted-foreground mt-1">
            Manage driver accounts and verification status
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/drivers/verification")}
          >
            <FileCheck className="w-4 h-4 mr-2" />
            Document Verification
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Add New Driver
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {driverStats.map((stat) => (
          <Card key={stat.title} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === "primary"
                    ? "bg-primary/10"
                    : stat.color === "success"
                    ? "bg-success/10"
                    : "bg-warning/10"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 ${
                    stat.color === "primary"
                      ? "text-primary"
                      : stat.color === "success"
                      ? "text-success"
                      : "text-warning"
                  }`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters & Tabs */}
      <Card className="glass-card mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search drivers by name, email, or ID..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verification</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">All Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Rides</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={driver.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {driver.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">{driver.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-foreground">{driver.vehicle}</p>
                      <p className="text-xs text-muted-foreground">{driver.licensePlate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{driver.totalRides.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{driver.earnings}</TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>{getVerificationBadge(driver.verificationStatus)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/drivers/verification")}>
                          <FileCheck className="w-4 h-4 mr-2" />
                          View Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Driver</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend Driver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Drivers;
