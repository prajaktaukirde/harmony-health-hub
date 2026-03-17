import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { patients } from "@/utils/mockData";
import { CheckCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddDiagnosis = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    patientId: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientId || !form.diagnosis) {
      toast({ title: "Missing Fields", description: "Please fill patient and diagnosis.", variant: "destructive" });
      return;
    }
    toast({ title: "Diagnosis Saved", description: "Medical record has been saved successfully." });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardLayout role="doctor">
        <div className="max-w-lg mx-auto">
          <Card className="text-center p-10">
            <div className="w-16 h-16 rounded-full bg-hospital-green/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-hospital-green" />
            </div>
            <h2 className="text-xl font-bold mb-2">Diagnosis Saved!</h2>
            <p className="text-muted-foreground mb-6">The medical record has been saved to the patient's profile.</p>
            <Button onClick={() => { setSubmitted(false); setForm({ patientId: "", symptoms: "", diagnosis: "", prescription: "", notes: "" }); }}>
              Add Another
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Add Diagnosis</h1>
          <p className="text-muted-foreground text-sm mt-1">Record patient diagnosis and prescription.</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Medical Record Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Patient *</Label>
                <select
                  value={form.patientId}
                  onChange={(e) => set("patientId", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a patient...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} (Age: {p.age})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Symptoms</Label>
                <Textarea placeholder="Describe patient symptoms..." value={form.symptoms} onChange={(e) => set("symptoms", e.target.value)} rows={2} />
              </div>

              <div className="space-y-2">
                <Label>Diagnosis *</Label>
                <Input placeholder="e.g. Hypertension Stage 1" value={form.diagnosis} onChange={(e) => set("diagnosis", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Prescription</Label>
                <Textarea placeholder="Medications and dosage..." value={form.prescription} onChange={(e) => set("prescription", e.target.value)} rows={2} />
              </div>

              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Follow-up instructions, recommendations..." value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} />
              </div>

              <div className="p-4 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload test reports</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>

              <Button type="submit" className="w-full">Save Diagnosis</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddDiagnosis;
