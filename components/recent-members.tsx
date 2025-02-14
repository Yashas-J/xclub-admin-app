import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function RecentMembers() {
  return (
    <div className="space-y-8">
      {recentMembers.map((member) => (
        <div key={member.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={member.avatar} alt="Avatar" />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{member.name}</p>
            <p className="text-sm text-muted-foreground">
              {member.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {member.spent}
          </div>
        </div>
      ))}
    </div>
  )
}

const recentMembers = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/avatars/01.png",
    initials: "JS",
    spent: "+$1,999.00"
  },
  {
    name: "Emma Wilson",
    email: "emma.w@example.com",
    avatar: "/avatars/02.png",
    initials: "EW",
    spent: "+$799.00"
  },
  {
    name: "David Chen",
    email: "d.chen@example.com",
    avatar: "/avatars/03.png",
    initials: "DC",
    spent: "+$699.00"
  },
  {
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    avatar: "/avatars/04.png",
    initials: "SM",
    spent: "+$499.00"
  }
]