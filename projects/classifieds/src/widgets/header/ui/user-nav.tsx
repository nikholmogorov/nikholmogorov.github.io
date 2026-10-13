import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export function UserNav() {
  return (
    <div
      className={`flex items-center gap-2 rounded-md p-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span>User</span>
    </div>
  );
}
