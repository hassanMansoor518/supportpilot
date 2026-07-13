import { redirect } from "next/navigation";

export default function BillingRootPage() {
  redirect("/dashboard/billing/overview");
}
