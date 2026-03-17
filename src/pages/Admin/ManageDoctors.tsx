import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doctors as initialDoctors } from "@/utils/mockData";
import { Search, Plus, Edit2, Trash2, X, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ManageDoctors = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", specialization: "", department: "", phone: "", workingHours: "" });

  const filtered = initialDoctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    toast({ title: editing ? "Doctor Updated" : "Doctor Added", description: `${form.name} has been ${editing ? "updated" : "added"}.` });
    setOpen(false);
    setForm({ name: "", specialization: "", department: "", phone: "", workingHours: "" });
    setEditing(null);
  };

  const handleEdit = (d: typeof initialDoctors[0]) => {
    setForm({ name: d.name, specialization: d.specialization, department: d.department, phone: d.phone, workingHours: d.workingHours });
    setEditing(d.id);
    setOpen(true);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manage Doctors</h1>
            <p className="text-muted-foreground text-sm mt-1">{initialDoctors.length} doctors registered</p>
          </div>
          <Button onClick={() => { setEditing(null); setForm({ name: "", specialization: "", department: "", phone: "", workingHours: "" }); setOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add Doctor
          </Button>
        </div>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search doctors..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <Card key={doc.id} className="card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {doc.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.specialization}</p>
                    </div>
                  </div>
                  <Badge variant={doc.available ? "default" : "secondary"} className={`text-xs ${doc.available ? "bg-hospital-green/10 text-hospital-green border-hospital-green/20" : ""}`}>
                    {doc.available ? "Active" : "Away"}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground mb-3">
                  <p>{doc.department}</p>
                  <p>{doc.workingHours}</p>
                  <p className="flex items-center gap-1 text-hospital-amber">
                    <Star className="w-3 h-3 fill-current" /> {doc.rating} · {doc.experience} yrs exp
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-7 text-xs" onClick={() => handleEdit(doc)}>
                    <Edit2 className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 h-7 text-xs" onClick={() => toast({ title: "Doctor Removed", variant: "destructive" })}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {[
              { key: "name", label: "Full Name", placeholder: "Dr. John Smith" },
              { key: "specialization", label: "Specialization", placeholder: "Cardiologist" },
              { key: "department", label: "Department", placeholder: "Cardiology" },
              { key: "phone", label: "Phone", placeholder: "+1 555-0000" },
              { key: "workingHours", label: "Working Hours", placeholder: "Mon-Fri 9AM-5PM" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-1">
                <Label className="text-xs">{label}</Label>
                <Input
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Save Changes" : "Add Doctor"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManageDoctors;
