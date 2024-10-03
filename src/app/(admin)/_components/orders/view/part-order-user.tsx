import { User } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  user: Omit<User, 'password'>
}

export const PartOrderUser = ({ user }: Props) => {
  return ( 
    <Card className="cursor-pointer transition-all hover:border-secondaryMain border">
      <CardContent className="pt-6">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarFallback className="bg-secondaryMain">{user.name[0] + user.name[1]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}