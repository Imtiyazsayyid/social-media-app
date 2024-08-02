import { Copy, MessageCircleIcon, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

interface Props {
  comment: string;
  setComment: (comment: string) => void;
  onSubmit: (val: string) => void;
}

export default function CommentModal({ comment, setComment, onSubmit }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessageCircleIcon fill={"#363A3D"} stroke={"0"} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-xl bg-dark-300 text-white border-none">
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
        </DialogHeader>
        <div className="flex space-x-2 items-end">
          <div className="grid flex-1 gap-2">
            <Textarea
              id="link"
              className="shad-textArea resize-none h-56"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Send className="h-5 w-5 hover:opacity-75" onClick={() => onSubmit(comment)} />
          </Button>
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
