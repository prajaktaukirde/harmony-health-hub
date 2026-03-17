import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appointments } from "@/utils/mockData";
import { Clock, CheckCircle, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColor: Record<string, string> = {
  Scheduled: "bg-hospital-blue/10 text-hospital-blue border-hospital-blue/20",
  Completed: "bg-hospital-green/10 text-hospital-green border-hospital-green/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "In Progress": "bg-hospital-amber/10 text-hospital-amber border-hospital-amber/20",
};

const AppointmentSchedule = () => {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const myAppts = appointments.filter((a) => a.doctorId === "d1");

  const handleMarkComplete = (id: string) => {
    toast({ title: "Appointment Completed", description: "Marked as completed successfully." });
  };

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Appointment Schedule</h1>
            <p className="text-muted-foreground text-sm mt-1">{myAppts.length} total appointments</p>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-4">
          {myAppts.map((appt) => (
            <Card key={appt.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {appt.patientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{appt.patientName}</p>
                      <p className="text-sm text-muted-foreground">{appt.reason}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {appt.date} at {appt.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`border ${statusColor[appt.status]}`} variant="outline">{appt.status}</Badge>
                    {appt.status === "Scheduled" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                          <Stethoscope className="w-3 h-3 mr-1" /> Start
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-hospital-green hover:bg-hospital-green/90 text-white" onClick={() => handleMarkComplete(appt.id)}>
                          <CheckCircle className="w-3 h-3 mr-1" /> Complete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentSchedule;
