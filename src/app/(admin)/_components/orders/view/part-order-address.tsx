import { Address } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Props = {
  address: Address
}

export const PartOrderAddress = ({ address }: Props) => {
  return ( 
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <address className="text-muted-foreground flex gap-2 ">
          <span>{address.streetName}</span>
          <span>{address.homeNumber}</span>
          <span>{address.phoneNumber}</span>
        </address>
      </CardContent>
    </Card>
  );
}