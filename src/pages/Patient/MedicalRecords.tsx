import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { medicalRecords } from "@/utils/mockData";
import { Search, FileText, Download, FlaskConical, Pill } from "lucide-react";

const MedicalRecords = () => {
  const [search, setSearch] = useState("");
  const records = medicalRecords.filter((r) => r.patientId === "p1");

  const filtered = records.filter((r) =>
    r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
    r.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Medical Records</h1>
            <p className="text-muted-foreground text-sm mt-1">{records.length} records found</p>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search diagnosis or doctor..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              No medical records found.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((rec) => (
              <Card key={rec.id} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">{rec.diagnosis}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{rec.doctor} · {rec.date}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Prescription</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.prescription}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-4 h-4 text-hospital-blue" />
                        <span className="text-sm font-medium">Tests Ordered</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.tests.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm font-medium mb-1">Doctor's Notes</p>
                    <p className="text-sm text-muted-foreground">{rec.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;
