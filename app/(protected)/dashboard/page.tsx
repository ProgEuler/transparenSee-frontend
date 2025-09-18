// import { ModeToggle } from "@/components/theme-toggle";
import Protected from "@/providers/Protected";


export default function GovDashboard() {
  return (
    <Protected role="gov">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Government Dashboard</h1>
          {/* <ModeToggle /> */}
        </div>
        <p>Only users with <strong>gov</strong> role can see this.</p>
      </div>
    </Protected>
  )
}
