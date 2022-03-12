export function getPriceId(type) {
  let env = "DEV";
  let url = "";
  if (typeof window !== "undefined") {
    let target = window.location.href;
    env = target.match(/aidoc.io|localhost|aimedix.com|virtualhospital.aimedis.io/) ? "DEV" : "PRD";
  }
  if (env === "DEV") {
    let price = type == "Doc Around The Clock" ? "price_1IiFBiH4UyTD79BwHpJf72tD" : "price_1IiFEJH4UyTD79BwEEdzAZe1"
    return price;
  } else {
    let price = type == "Doc Around The Clock" ? "price_1IiFBnH4UyTD79Bw5bl9Iu6o" : "price_1IiFEsH4UyTD79BwpNveERog"
    return price;
  }
}

export function getPublishableKey() {
  let env = "DEV";
  let url = "";
  if (typeof window !== "undefined") {
    let target = window.location.href;
    env = target.match(/aidoc.io|localhost|aimedix.com|virtualhospital.aimedis.io/) ? "DEV" : "PRD";
  }
  let STRIPE_PUBLISHABLE
  if (env === "DEV") {
    STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_TEST;
  } else {
    STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE;
  }
  return STRIPE_PUBLISHABLE;
}
