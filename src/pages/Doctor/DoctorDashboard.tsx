import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments, patients } from "@/utils/mockData";
import { Calendar, Users, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusColor: Record<string, string> = {
  Scheduled: "bg-hospital-blue/10 text-hospital-blue border-hospital-blue/20",
  Completed: "bg-hospital-green/10 text-hospital-green border-hospital-green/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "In Progress": "bg-hospital-amber/10 text-hospital-amber border-hospital-amber/20",
};

const DoctorDashboard = () => {
  const myAppts = appointments.filter((a) => a.doctorId === "d1");
  const todayAppts = myAppts.filter((a) => a.status === "Scheduled" || a.status === "In Progress");
  const completed = myAppts.filter((a) => a.status === "Completed");

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Overview of your schedule and patients.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Today's Appointments", value: todayAppts.length, icon: Calendar, color: "text-hospital-blue", bg: "bg-hospital-blue/10" },
            { label: "Total Patients", value: patients.length, icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "Completed Visits", value: completed.length, icon: CheckCircle, color: "text-hospital-green", bg: "bg-hospital-green/10" },
            { label: "Pending Diagnoses", value: 2, icon: Clock, color: "text-hospital-amber", bg: "bg-hospital-amber/10" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Today's Schedule</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/doctor/schedule">View all <ChevronRight className="w-3 h-3 ml-1" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {myAppts.slice(0, 4).map((appt) => (
                  <div key={appt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                        {appt.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{appt.patientName}</p>
                        <p className="text-xs text-muted-foreground">{appt.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{appt.time}</p>
                      <Badge className={`text-xs border mt-1 ${statusColor[appt.status]}`} variant="outline">{appt.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Patients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patients.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.condition}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{p.age}y</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
