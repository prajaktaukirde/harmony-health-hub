import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doctors, departments, timeSlots } from "@/utils/mockData";
import { CheckCircle, ChevronRight, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({
    department: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const filteredDoctors = selected.department
    ? doctors.filter((d) => d.department === selected.department)
    : doctors;

  const selectedDoctor = doctors.find((d) => d.id === selected.doctorId);

  const handleConfirm = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor?.name} on ${selected.date} at ${selected.time} has been confirmed.`,
    });
    setStep(5);
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
            step > s ? "bg-hospital-green text-white" : step === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {step > s ? <CheckCircle className="w-4 h-4" /> : s}
          </div>
          {s < 4 && <div className={`h-0.5 w-8 sm:w-16 ${step > s ? "bg-hospital-green" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout role="patient">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Book an Appointment</h1>
          <p className="text-muted-foreground text-sm mt-1">Follow the steps to schedule your visit.</p>
        </div>

        <StepIndicator />

        {step === 5 ? (
          <Card className="text-center p-10">
            <div className="w-16 h-16 rounded-full bg-hospital-green/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-hospital-green" />
            </div>
            <h2 className="text-xl font-bold mb-2">Appointment Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your appointment with <strong>{selectedDoctor?.name}</strong> has been booked for{" "}
              <strong>{selected.date}</strong> at <strong>{selected.time}</strong>.
            </p>
            <Button onClick={() => { setStep(1); setSelected({ department: "", doctorId: "", date: "", time: "", reason: "" }); }}>
              Book Another
            </Button>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {step === 1 && "Step 1: Select Department"}
                {step === 2 && "Step 2: Choose Doctor"}
                {step === 3 && "Step 3: Select Date & Time"}
                {step === 4 && "Step 4: Confirm Appointment"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1 */}
              {step === 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelected((p) => ({ ...p, department: dept }))}
                      className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                        selected.department === dept
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-3">
                  {filteredDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelected((p) => ({ ...p, doctorId: doc.id }))}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selected.doctorId === doc.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                          {doc.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.specialization} · {doc.experience} yrs</p>
                        </div>
                        <Badge variant={doc.available ? "default" : "secondary"} className={doc.available ? "bg-hospital-green/10 text-hospital-green border-hospital-green/20" : ""}>
                          {doc.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <input
                      type="date"
                      value={selected.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setSelected((p) => ({ ...p, date: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Time Slot</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelected((p) => ({ ...p, time: slot }))}
                          className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center gap-1 justify-center transition-all ${
                            selected.time === slot
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Clock className="w-3 h-3" /> {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for Visit (optional)</Label>
                    <Textarea
                      placeholder="Describe your symptoms or reason..."
                      value={selected.reason}
                      onChange={(e) => setSelected((p) => ({ ...p, reason: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{selected.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Doctor</span>
                      <span className="font-medium">{selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selected.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{selected.time}</span>
                    </div>
                    {selected.reason && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Reason</span>
                        <span className="font-medium text-right max-w-[60%]">{selected.reason}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
                      <span>Estimated Cost</span>
                      <span className="text-primary">${selectedDoctor ? 150 : 0}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 1}>
                  Back
                </Button>
                {step < 4 ? (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={
                      (step === 1 && !selected.department) ||
                      (step === 2 && !selected.doctorId) ||
                      (step === 3 && (!selected.date || !selected.time))
                    }
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={handleConfirm} className="bg-hospital-green hover:bg-hospital-green/90 text-white">
                    Confirm Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookAppointment;
