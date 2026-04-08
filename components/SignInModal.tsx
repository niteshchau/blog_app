import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogDemo({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="mb-8">
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            Please sign in to write and publish your story.
          </DialogDescription>
        </DialogHeader>
        <a href="/signin" 
            className="bg-white text-purple-600 px-6 py-2.5 rounded-full font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
            Sign In
        </a>
        
      </DialogContent>
    </Dialog>
  );
}