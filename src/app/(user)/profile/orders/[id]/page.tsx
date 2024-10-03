import { getOrderOffers } from "@/actions/app";
import { getSingleOrder } from "@/actions/user";
import { SingleOrder } from "@/app/_components/user/orders/single-order";

const OrderIdPage = async ({ params }: { params: { id: string } }) => {

  const orderId = params.id ? +params.id : 0
  const order = await getSingleOrder(orderId)
  const offers = await getOrderOffers(orderId)

  return (
    <SingleOrder order={order} offers={offers} />
  );
}
 
export default OrderIdPage;