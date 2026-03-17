import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invoices } from "@/utils/mockData";
import { CreditCard, DollarSign, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusIcon = {
  Paid: CheckCircle,
  Pending: Clock,
  Overdue: AlertTriangle,
};

const statusColor: Record<string, string> = {
  Paid: "bg-hospital-green/10 text-hospital-green border-hospital-green/20",
  Pending: "bg-hospital-amber/10 text-hospital-amber border-hospital-amber/20",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
};

const Billing = () => {
  const { toast } = useToast();
  const myInvoices = invoices.filter((i) => i.patientId === "p1");
  const total = myInvoices.reduce((s, i) => s + i.amount, 0);
  const paid = myInvoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = myInvoices.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);

  const handlePay = (id: string, amount: number) => {
    toast({
      title: "Payment Processed",
      description: `$${amount} has been paid successfully.`,
    });
  };

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Billing & Payments</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage your invoices.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Billed", value: `$${total}`, icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
            { label: "Amount Paid", value: `$${paid}`, icon: CheckCircle, color: "text-hospital-green", bg: "bg-hospital-green/10" },
            { label: "Pending Amount", value: `$${pending}`, icon: Clock, color: "text-hospital-amber", bg: "bg-hospital-amber/10" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Invoice List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Invoice History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Invoice ID</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Services</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myInvoices.map((inv) => {
                    const StatusIcon = statusIcon[inv.status];
                    return (
                      <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium font-mono text-xs">{inv.id.toUpperCase()}</td>
                        <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {inv.services.map((s) => (
                              <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold">${inv.amount}</td>
                        <td className="px-4 py-3">
                          <Badge className={`border flex items-center gap-1 w-fit ${statusColor[inv.status]}`} variant="outline">
                            <StatusIcon className="w-3 h-3" /> {inv.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {inv.status === "Pending" ? (
                            <Button size="sm" onClick={() => handlePay(inv.id, inv.amount)} className="h-7 text-xs">
                              <CreditCard className="w-3 h-3 mr-1" /> Pay Now
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
