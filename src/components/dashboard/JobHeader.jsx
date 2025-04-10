import { Button } from "@/components/ui/button";
import { PlusCircle, Briefcase } from "lucide-react";

export function JobHeader({ openForm, handleLogout, user }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        <Briefcase className="h-8 w-8 mr-4 text-slate-700" />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-800">
          Student Job Tracker
        </h1>
        <h1 className="text-lg font-medium text-slate-800">Welcome <span className="font-bold">{user?.name}</span> </h1>
        </div>
        
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={openForm}
          className="bg-slate-800 hover:bg-slate-700 text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Application
        </Button>
        <Button
        variant="outline"
          onClick={handleLogout}
          className= " hover:bg-slate-200"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
