import { normalize, schema } from "normalizr";

const client = new schema.Entity("merchants");
const payment = new schema.Entity("payments", {
  creator: client
})

const paymentsListSchema = new schema.Array(payment);

export default function normalizer(data) {
  const normalizedData = normalize(data, paymentsListSchema);
  return {
    merchants: normalizedData.entities["merchants"],
    payments: normalizedData.entities["payments"]
  };
}

