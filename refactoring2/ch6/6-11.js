export function priceOrder(product, quantity, shippingMethod) {
  const basePrice = getOriginalPrice(product.basePrice, quantity);

  const discount = calculateDiscountFee(product, quantity);

  const shippingCost =
    quantity * getShippingFeePerCase(basePrice, shippingMethod);

  const result = basePrice - discount + shippingCost;

  return result;
}

function getOriginalPrice(basePrice, quantity) {
  return basePrice * quantity;
}

function calculateDiscountFee(product, quantity) {
  const { discountThreshold, basePrice, discountRate } = product;
  const discountQuantity = Math.max(quantity - discountThreshold, 0);
  return discountQuantity * basePrice * discountRate;
}

function getShippingFeePerCase(basePrice, shippingMethod) {
  const { discountThreshold, discountedFee, feePerCase } = shippingMethod;
  return basePrice > discountThreshold ? discountedFee : feePerCase;
}

// 사용 예:
const product = {
  basePrice: 10,
  discountRate: 0.1,
  discountThreshold: 10,
};

const shippingMethod = {
  discountThreshold: 20,
  feePerCase: 5,
  discountedFee: 3,
};

const price = priceOrder(product, 5, shippingMethod);
console.log(price);
