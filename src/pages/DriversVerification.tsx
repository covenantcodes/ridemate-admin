import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  FileCheck,
  FileX,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  ChevronLeft,
  FileText,
  Car,
  CreditCard,
  Shield,
  Camera,
  Calendar,
  User,
  ZoomIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const verificationStats = [
  {
    title: "Pending Review",
    value: "47",
    icon: Clock,
    color: "warning",
  },
  {
    title: "Approved Today",
    value: "23",
    icon: CheckCircle2,
    color: "success",
  },
  {
    title: "Rejected Today",
    value: "5",
    icon: XCircle,
    color: "destructive",
  },
  {
    title: "Needs Resubmission",
    value: "12",
    icon: AlertCircle,
    color: "primary",
  },
];

const pendingDrivers = [
  {
    id: "DRV-003",
    name: "David Lee",
    email: "david.lee@email.com",
    avatar: "",
    initials: "DL",
    submittedAt: "2024-01-15 09:30 AM",
    documentsCount: 5,
    documentsVerified: 3,
    priority: "high",
  },
  {
    id: "DRV-007",
    name: "Sarah Miller",
    email: "sarah.miller@email.com",
    avatar: "",
    initials: "SM",
    submittedAt: "2024-01-15 10:15 AM",
    documentsCount: 5,
    documentsVerified: 4,
    priority: "medium",
  },
  {
    id: "DRV-008",
    name: "Tom Anderson",
    email: "tom.anderson@email.com",
    avatar: "",
    initials: "TA",
    submittedAt: "2024-01-15 11:00 AM",
    documentsCount: 5,
    documentsVerified: 2,
    priority: "low",
  },
  {
    id: "DRV-009",
    name: "Jessica Brown",
    email: "jessica.brown@email.com",
    avatar: "",
    initials: "JB",
    submittedAt: "2024-01-14 03:45 PM",
    documentsCount: 5,
    documentsVerified: 5,
    priority: "high",
  },
];

const selectedDriverDocuments = [
  {
    id: "DOC-001",
    type: "Driver's License",
    icon: CreditCard,
    status: "verified",
    uploadedAt: "2024-01-14",
    expiryDate: "2027-03-15",
    thumbnail: "/placeholder.svg",
    notes: "Valid and matches profile information",
  },
  {
    id: "DOC-002",
    type: "Vehicle Registration",
    icon: Car,
    status: "verified",
    uploadedAt: "2024-01-14",
    expiryDate: "2025-06-20",
    thumbnail: "/placeholder.svg",
    notes: "Registration current and valid",
  },
  {
    id: "DOC-003",
    type: "Insurance Certificate",
    icon: Shield,
    status: "pending",
    uploadedAt: "2024-01-14",
    expiryDate: "2024-12-31",
    thumbnail: "/placeholder.svg",
    notes: "",
  },
  {
    id: "DOC-004",
    type: "Profile Photo",
    icon: Camera,
    status: "verified",
    uploadedAt: "2024-01-14",
    expiryDate: null,
    thumbnail: "/placeholder.svg",
    notes: "Clear photo, face visible",
  },
  {
    id: "DOC-005",
    type: "Background Check",
    icon: FileText,
    status: "pending",
    uploadedAt: "2024-01-14",
    expiryDate: null,
    thumbnail: "/placeholder.svg",
    notes: "",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-success/10 text-success border-0 gap-1">
          <CheckCircle2 className="w-3 h-3" />
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
          <XCircle className="w-3 h-3" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-destructive/10 text-destructive border-0">High Priority</Badge>;
    case "medium":
      return <Badge className="bg-warning/10 text-warning border-0">Medium</Badge>;
    case "low":
      return <Badge className="bg-muted text-muted-foreground border-0">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

const DriversVerification = () => {
  const navigate = useNavigate();
  const [selectedDriver, setSelectedDriver] = useState(pendingDrivers[0]);
  const [previewDocument, setPreviewDocument] = useState<typeof selectedDriverDocuments[0] | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/drivers")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Document Verification
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and verify driver documents
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {verificationStats.map((stat) => (
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
                  stat.color === "warning"
                    ? "bg-warning/10"
                    : stat.color === "success"
                    ? "bg-success/10"
                    : stat.color === "destructive"
                    ? "bg-destructive/10"
                    : "bg-primary/10"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 ${
                    stat.color === "warning"
                      ? "text-warning"
                      : stat.color === "success"
                      ? "text-success"
                      : stat.color === "destructive"
                      ? "text-destructive"
                      : "text-primary"
                  }`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Queue */}
        <Card className="glass-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Pending Queue
              <Badge variant="secondary">{pendingDrivers.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search drivers..." className="pl-10" />
            </div>

            {/* Driver List */}
            {pendingDrivers.map((driver) => (
              <div
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedDriver.id === driver.id
                    ? "border-primary bg-primary/5"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={driver.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {driver.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-foreground truncate">
                        {driver.name}
                      </p>
                      {getPriorityBadge(driver.priority)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {driver.submittedAt}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              (driver.documentsVerified / driver.documentsCount) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {driver.documentsVerified}/{driver.documentsCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Review */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedDriver.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {selectedDriver.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedDriver.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedDriver.email} • {selectedDriver.id}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={() => setRejectDialogOpen(true)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject All
                </Button>
                <Button className="bg-success hover:bg-success/90">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="documents">
              <TabsList className="mb-6">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-4">
                {selectedDriverDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Document Thumbnail */}
                      <div
                        className="relative w-24 h-24 rounded-lg bg-muted flex items-center justify-center cursor-pointer group overflow-hidden"
                        onClick={() => setPreviewDocument(doc)}
                      >
                        <doc.icon className="w-8 h-8 text-muted-foreground" />
                        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-background" />
                        </div>
                      </div>

                      {/* Document Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {doc.type}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Uploaded: {doc.uploadedAt}
                              </span>
                              {doc.expiryDate && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Expires: {doc.expiryDate}
                                </span>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(doc.status)}
                        </div>

                        {doc.notes && (
                          <p className="text-sm text-muted-foreground mt-2 bg-muted/50 p-2 rounded">
                            {doc.notes}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewDocument(doc)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          {doc.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-success hover:bg-success/90 ml-auto"
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="history">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Driver's License Approved
                      </p>
                      <p className="text-xs text-muted-foreground">
                        By Admin User • Jan 14, 2024 at 2:30 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Vehicle Registration Approved
                      </p>
                      <p className="text-xs text-muted-foreground">
                        By Admin User • Jan 14, 2024 at 2:35 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Documents Submitted
                      </p>
                      <p className="text-xs text-muted-foreground">
                        By David Lee • Jan 14, 2024 at 9:30 AM
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add a note about this verification..."
                    className="min-h-[100px]"
                  />
                  <Button>Add Note</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewDocument?.type}</DialogTitle>
            <DialogDescription>
              Uploaded on {previewDocument?.uploadedAt}
              {previewDocument?.expiryDate && ` • Expires ${previewDocument.expiryDate}`}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
            {previewDocument && (
              <previewDocument.icon className="w-24 h-24 text-muted-foreground" />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDocument(null)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            {previewDocument?.status === "pending" && (
              <>
                <Button className="bg-success hover:bg-success/90">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this driver's application.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => setRejectDialogOpen(false)}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DriversVerification;
