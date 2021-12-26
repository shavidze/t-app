type ErrorMessagesType = {
  required: () => string;
  mustBe: (number: any, valueType: string) => string;
  requiredPattern: (value: any) => string;
  minPrice: (price: number) => string;
  mismatch: () => string;
};
export const ErrorMessages: ErrorMessagesType = {
  required: () => "This field is required",
  mustBe: (number: any, valueType: string) =>
    `This field must be at least ${number}-${valueType}`,
  requiredPattern: (value: any) => `Please enter a valid ${value}`,
  minPrice: (price: number) => `Minimum price should be ${price} `,
  mismatch: () => "Passwords should be the same",
};
