import timeFormatter from '../../utils/timeFormatter';

export default {
  purchaseorderId: {
    label: 'Purchaseorder Id',
  },
  purchaseorderNumber: {
    label: 'Purchaseorder Number',
    inTable: true,
    inDetails: true,
    required: true,
  },
  referenceNumber: {
    label: 'Reference Number',
    inTable: true,
    inDetails: true,
  },
  date: {
    label: 'Order Date',
    inTable: true,
    inDetails: true,
    formatter: timeFormatter('date'),
  },
  createdTime: {
    label: 'Created Time',
    inDetails: true,
    formatter: timeFormatter('dateTime'),
  },
  totalQuantity: {
    label: 'Total Quantity',
    inTable: true,
    inDetails: true,
  },
  totalPrice: {
    label: 'Total Price ($)',
    inTable: true,
    inDetails: true,
  },
  supplier: {
    label: 'Supplier',
    inTable: true,
    inDetails: true,
  },
}