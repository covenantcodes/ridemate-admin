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
import {
  Star,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const reviewStats = [
  {
    title: "Average Rating",
    value: "4.7",
    subtitle: "out of 5.0",
    icon: Star,
    trend: "+0.2",
    trendUp: true,
  },
  {
    title: "Total Reviews",
    value: "12,847",
    subtitle: "this month",
    icon: MessageSquare,
    trend: "+15%",
    trendUp: true,
  },
  {
    title: "Positive Reviews",
    value: "89%",
    subtitle: "4+ stars",
    icon: ThumbsUp,
    trend: "+3%",
    trendUp: true,
  },
  {
    title: "Negative Reviews",
    value: "4%",
    subtitle: "2 or less stars",
    icon: ThumbsDown,
    trend: "-1%",
    trendUp: false,
  },
];

const ratingDistribution = [
  { stars: 5, count: 7234, percentage: 56 },
  { stars: 4, count: 3412, percentage: 27 },
  { stars: 3, count: 1156, percentage: 9 },
  { stars: 2, count: 642, percentage: 5 },
  { stars: 1, count: 403, percentage: 3 },
];

const reviews = [
  {
    id: "REV-001",
    user: { name: "Sarah Johnson", avatar: "", initials: "SJ" },
    driver: { name: "Michael Chen", avatar: "", initials: "MC" },
    rating: 5,
    comment:
      "Excellent ride! The driver was punctual, professional, and the car was spotless. Will definitely book again.",
    rideId: "RD-8472",
    date: "2024-01-15",
    helpful: 24,
    status: "published",
  },
  {
    id: "REV-002",
    user: { name: "James Wilson", avatar: "", initials: "JW" },
    driver: { name: "Emma Davis", avatar: "", initials: "ED" },
    rating: 4,
    comment:
      "Good experience overall. Driver was friendly and took the best route. Minor delay at pickup but communicated well.",
    rideId: "RD-8465",
    date: "2024-01-15",
    helpful: 12,
    status: "published",
  },
  {
    id: "REV-003",
    user: { name: "Emily Brown", avatar: "", initials: "EB" },
    driver: { name: "David Lee", avatar: "", initials: "DL" },
    rating: 5,
    comment:
      "Best ride service I've used! Driver was super helpful with my luggage and the AC was perfect.",
    rideId: "RD-8458",
    date: "2024-01-14",
    helpful: 45,
    status: "published",
  },
  {
    id: "REV-004",
    user: { name: "Robert Taylor", avatar: "", initials: "RT" },
    driver: { name: "Lisa Wang", avatar: "", initials: "LW" },
    rating: 2,
    comment:
      "Disappointing experience. Driver arrived late and seemed unfamiliar with the area. Need improvement.",
    rideId: "RD-8451",
    date: "2024-01-14",
    helpful: 8,
    status: "flagged",
  },
  {
    id: "REV-005",
    user: { name: "Amanda Garcia", avatar: "", initials: "AG" },
    driver: { name: "John Smith", avatar: "", initials: "JS" },
    rating: 5,
    comment:
      "Absolutely fantastic! Clean car, safe driving, and great conversation. 10/10 would recommend.",
    rideId: "RD-8444",
    date: "2024-01-13",
    helpful: 31,
    status: "published",
  },
  {
    id: "REV-006",
    user: { name: "Chris Martinez", avatar: "", initials: "CM" },
    driver: { name: "Rachel Green", avatar: "", initials: "RG" },
    rating: 3,
    comment:
      "Average ride. Nothing special but nothing wrong either. Car was clean and driver was okay.",
    rideId: "RD-8437",
    date: "2024-01-13",
    helpful: 5,
    status: "pending",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-accent text-accent"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return <Badge className="bg-success/10 text-success border-0">Published</Badge>;
    case "flagged":
      return <Badge className="bg-destructive/10 text-destructive border-0">Flagged</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning border-0">Pending</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const Reviews = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage customer feedback and ratings
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reviewStats.map((stat) => (
          <Card key={stat.title} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <span className="text-xs text-muted-foreground">{stat.subtitle}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trendUp ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-success" />
                  )}
                  <span className="text-xs text-success">{stat.trend} vs last month</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rating Distribution & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rating Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium">{item.stars}</span>
                  <Star className="w-3 h-3 fill-accent text-accent" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-16 text-right">
                  {item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Filter Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {review.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {review.user.name}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-sm text-muted-foreground">
                        {review.driver.name}
                      </span>
                      <StarRating rating={review.rating} />
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-sm text-foreground/80 mb-2">
                      {review.comment}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span>Ride: {review.rideId}</span>
                      <span>{review.date}</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {review.helpful} found helpful
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Reply to Review</DropdownMenuItem>
                    <DropdownMenuItem>Flag Review</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove Review
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Reviews;
