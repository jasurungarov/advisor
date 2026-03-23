/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { deleteAssessment } from "@/app/actions/assessment"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MdOutlineDelete } from 'react-icons/md'
import { toast } from "sonner"

function Delete({id}: {id: string}) {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {

    setIsDeleting(id); // Yuklanish holatini yoqamiz

    try {
      const result = await deleteAssessment(id);

      if (result.success) {
        toast.success("Deleted Successfully");
        router.refresh(); // Sahifani yangilab, ro'yxatdan o'chiramiz
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    
    <div className="w-full">
      <Button
        variant="destructive"
        size="lg"
        disabled={isDeleting === id}
        onClick={() => handleDelete(id)}
        className="rounded-full w-full gap-2 text-white font-semibold hover:bg-destructive shadow-destructive border border-destructive transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)] dark:shadow-destructive dark:hover:shadow-destructive shadow">
        {isDeleting === id ? (
          <>Deleting...</>
        ) : (
          <>
            Delete
            <MdOutlineDelete className="size-4" />
          </>
        )}
      </Button>
    </div>
    
  );
}

export default Delete;
