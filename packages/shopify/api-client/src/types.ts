export interface ApiClientMethods {
  getCategory(params: {}): Promise<Category[]>;
  getProduct(params: {}): Promise<ProductVariant[]>;
  getShop(params: {}): Promise<Shop[]>;
}

export interface ApiClientSettings {
  overrides: {
    getCategory?(): Promise<Category[]>;
    getProduct?(params: {}): Promise<ProductVariant[]>;
    getShop?(): Promise<Shop[]>;
  };
}

export type Maybe<T> = T | null;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;

  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date and time. */
  DateTime: any;

  /** [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code. */
  Country: any;

  /** Locale is a scalar value represented as a string language tag. */
  Locale: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date. */
  Date: any;

  /** Raw JSON value */
  Json: any;

  /** Array */
  Array: any;

  /** Represents a currency. Currencies are identified by their [ISO
   * 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes.
   */
  Currency: any;

  /** A key that references a resource. */
  KeyReferenceInput: any;

  /** Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria" */
  SearchFilter: any;

  /** Search sort */
  SearchSort: any;

  /** YearMonth is a scalar value that represents an ISO8601 formatted year and month. */
  YearMonth: any;

  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any;

  /** Time is a scalar value that represents an ISO8601 formatted time. */
  Time: any;
};

export type Cart = {}
export type Wishlist = {}
export type Product = {}
export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  images: Maybe<Scalars['Array']>;
  options: Maybe<Scalars['Array']>;
  productType: Maybe<Scalars['String']>;
  publishedAt: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  descriptionHtml: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  availableForSale: Maybe<Scalars['Boolean']>;
  variants: Maybe<Scalars['Array']>;
  vendor: Maybe<Scalars['String']>;
}
export type ProductParams = {
  type: Scalars['String'];
  data: Maybe<Scalars['Json']>;
}
export type Category = {
  __typename?: 'Category';
  id: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  descriptionHtml: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
}
export type CategoryFilter = {}
export type ShippingMethod = {}
export type LineItem = {};
export type CategorySearchParams = {
  id: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  customQuery: Maybe<Scalars['String']>;
  withProducts: Maybe<Scalars['Boolean']>;
}
export type ProductSearchParams = {
  id: Maybe<Scalars['String']>;
  // ids: Maybe<Scalars['Json']>;
  handle: Maybe<Scalars['String']>;
  customQuery: Maybe<Scalars['Json']>;
  ids: any;
  with: any;
  where: any;
  sort: any;
  page: any;
  masterKey: Maybe<Scalars['String']>;
  term: any;
}
export type Shop = {}
export type ShopSearchParams = {
  withPolicy: Maybe<Scalars['Boolean']>;
}
export type CartParams = {
  checkoutId: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  lineItems: Maybe<Scalars['Json']>;
  lineItemIds: Maybe<Scalars['Array']>;
  input: Maybe<Scalars['Json']>;
  discountCode: Maybe<Scalars['String']>;
  appliedGiftCardId: Maybe<Scalars['String']>;
  giftCardCodes: Maybe<Scalars['Array']>;
  shippingAddress: Maybe<Scalars['Json']>;
}

export type Customer = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}

export type CustomerParams = {}
