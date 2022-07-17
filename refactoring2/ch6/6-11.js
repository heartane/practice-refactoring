export function priceOrder(product, quantity, shippingMethod) {
  const basePrice = calculateBasePrice(product.basePrice, quantity);

  const discount = calculateDiscountedFee(product, quantity);

  const shippingCost = calculateShippingCost(
    basePrice,
    quantity,
    shippingMethod
  );

  return basePrice - discount + shippingCost;
}

function calculateBasePrice(basePrice, quantity) {
  return basePrice * quantity;
}

function calculateDiscountedFee(product, quantity) {
  const { discountThreshold, basePrice, discountRate } = product;
  const discountQuantity = Math.max(quantity - discountThreshold, 0);
  return discountQuantity * basePrice * discountRate;
}

function calculateShippingCost(basePrice, quantity, shippingMethod) {
  const { discountThreshold, discountedFee, feePerCase } = shippingMethod;
  const shippingFeePerCase =
    basePrice > discountThreshold ? discountedFee : feePerCase;

  return quantity * shippingFeePerCase;
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
