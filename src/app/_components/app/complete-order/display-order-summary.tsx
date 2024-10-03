"use client"

import Link from "next/link";
import translate from "@/services/translate";

import { useCoupon } from "@/hooks/useCoupon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { emptyOfferCart } from "@/store/slices/order-offer.slice";
import { emptyCart } from "@/store/slices/cart.slice";
import { responseCodes } from "@/lib/response";
import { createOrder } from "@/actions/app";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import { cn, formatNumber } from "@/lib/utils";

import { LanguageContext } from "@/providers/language";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Percent, X } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { LoadingButton } from "@/components/loading-button";
import { CustomInput } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Fragment } from "react";
import { Address } from "@prisma/client";
import { ClassValue } from "clsx";
import { CartItem } from "@/types";

type Props = {
  addresses: Address[]
  hasAddress: boolean
}

export const DisplayOrderSummary = ({ addresses, hasAddress }: Props) => {

  const [searchCoupon, setSearchCoupon] = useState('')
  const [selectedAddress, setSelectedAddress] = useState(String(addresses[1]?.id))

  const offerCart = useAppSelector(state => state.orderOfferCart)
  const cart = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  const defferedInput = useDeferredValue(searchCoupon)
  const coupon = useCoupon(defferedInput)
  const language = useContext(LanguageContext)
  const router = useRouter()

  let discountValuePercentage = coupon.coupon?.discount ? coupon.coupon.discount / 100 : 0
  let deliveryValue = 20
  let subTotal = 0

  cart.map(item => subTotal += item.totalPrice)
  offerCart.map(item => subTotal += item.price)

  const discountValue = (subTotal * discountValuePercentage)
  const total = (subTotal - discountValue) + deliveryValue

  const createOrderMutation = useMutation({
    mutationFn: ({ cart, couponId, addressId, deliveryValue }: { cart: CartItem[], couponId: number | undefined, addressId: number, deliveryValue: number }) => createOrder(cart, offerCart, couponId, addressId, deliveryValue),
    onSuccess: (data) => {
      if (data.status === responseCodes.badRequest) {
        toast.error(data.message)
        return 
      } else {
        toast.success(data.message)
        router.push(routes.profile('orders'))
        dispatch(emptyCart())
        dispatch(emptyOfferCart())
      }
    },
    onError: (data) => console.log(data)
  })

  const handleCreateNewOrder = () => {
    createOrderMutation.mutate({
      cart,
      deliveryValue,
      addressId: +selectedAddress,
      couponId: coupon.coupon?.id
    })
  }

  return (cart.length === 0 && offerCart.length === 0) ? null : (
    <div className="xl:col-span-2 border p-4 rounded-md h-fit w-full xl:mt-0 mt-4">
      
      <h2 className="pb-1 border-b text-xl font-bold">{translate('summary', language)}</h2>

      <div className="my-2 mb-0">

        <ul>
          
          <SummaryItem 
            left={translate('totalItems', language)}
            right={`${cart.length + offerCart.length}` + ` ${translate('items', language)}`}
          />

          <SummaryItem 
            left={translate('deliveryTaxes', language)}
            right={formatNumber(deliveryValue) + ' LE'}
            rightClassName='text-green-700'
          />

          {(coupon.couponLoading || coupon.couponFetching || coupon.couponRefetching) ? (
            <div className="my-2"><LoadingSpinner  /></div>
          ): (
            <Fragment>
              {coupon.coupon && (
                <Fragment>
                  <SummaryItem 
                    left={translate('coupon', language)}
                    right={`${coupon.coupon.name} - ${coupon.coupon.discount}%`}
                    rightClassName='text-green-700'
                  />
                  <SummaryItem 
                    left={translate('discount', language)}
                    right={formatNumber(discountValue) + ' LE'}
                    rightClassName='text-green-700'
                  />
                </Fragment>
              )}
            </Fragment>
          )}

          <SummaryItem 
            left={translate('subTotal', language)}
            right={formatNumber(subTotal) + ' LE'}
            rightClassName='text-green-700'
          />

          <SummaryItem 
            left={translate('total', language)}
            right={formatNumber(total) + ' LE'}
            rightClassName='text-green-700'
          />

        </ul>

      </div>

      {hasAddress ? (
        <Fragment>
        
          {/* Put A Coupon */}
          <div className="mt-0 mb-2">
            <Label className='text-xs'>{translate('doYouHaveCoupon', language)}</Label>
            <CustomInput value={searchCoupon} onChange={(event) => setSearchCoupon(event.target.value)} className='h-8 placeholder:text-xs' placeholder={translate('applyCoupon', language)} icon={Percent} />
            {!!searchCoupon && (
              <Fragment>
                {!coupon.coupon ? (
                  <p className="text-red-900 text-xs flex gap-2 mt-2 justify-end"><X className='size-4' /> {translate('noCouponFound', language)}</p>
                ): (
                  <p className="text-green-900 text-xs flex gap-2 mt-2 justify-end"><Check className='size-4' /> {translate('couponFound', language)}</p>
                )}
              </Fragment>
            )}
          </div>

          {/* Choose Payment Method */}
          <RadioGroup defaultValue="option-one" className="my-2 mt-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">{translate('cashOnDelivery', language)}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem disabled value="option-two" id="option-two" />
              <Label className="text-gray-500" htmlFor="option-two">{translate('onlinePayment', language)}</Label>
            </div>
          </RadioGroup>

          {/* Select An Address */}
          <div className='mb-2'>
            <Label className='text-xs'>{translate('selectAnAddress', language)}</Label>
            <Select defaultValue={selectedAddress} value={selectedAddress} onValueChange={(value) => setSelectedAddress(value)}>
              <SelectTrigger defaultValue={selectedAddress} value={selectedAddress} className="h-8 text-xs">
                <SelectValue placeholder={translate('selectAnAddress', language)} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {addresses?.map(address => <SelectItem className="h-8 text-xs" key={`address-idx-${address.id}`} value={String(address.id)}>{address.streetName} - {address.homeNumber} - {address.phoneNumber}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='w-full'>{translate('placeOrder', language)}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{translate('areYouSureTitle', language)}</AlertDialogTitle>
                <AlertDialogDescription>
                  {translate('areYouSureDescription', language)}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{translate('cancel', language)}</AlertDialogCancel>
                <AlertDialogAction asChild onClick={handleCreateNewOrder}><LoadingButton loading={createOrderMutation.isPending} variant='secondaryMain'>{translate('place', language)}</LoadingButton></AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Fragment>
      ): (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{translate('noAddressFound', language)}</AlertTitle>
          <AlertDescription className="text-xs">
            {translate('makeSureYouHaveAddress', language)} <Link className="font-medium text-secondaryMain hover:underline" href={routes.profile('addresses')}>{translate('viewAddresses', language)}</Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

type SummaryItemProps = {
  left?: React.ReactNode
  right?: React.ReactNode
  leftClassName?: ClassValue
  rightClassName?: ClassValue
}

export const SummaryItem = ({ leftClassName, rightClassName, left, right }: SummaryItemProps) => {
  return (
    <li className="flex items-center justify-between text-sm py-2">
      <span className={cn("", leftClassName)}>{left}</span>
      <span className={cn("font-medium", rightClassName)}>{right}</span>
    </li>
  )
}