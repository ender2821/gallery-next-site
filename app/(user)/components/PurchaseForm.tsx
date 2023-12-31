"use client";

import styles from "./forms.module.scss";

import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-purchase-email";
import Button from "./Button";

type PurchaseForm = {
  data: Product;
};

export type FormData = {
  fullName: string;
  email: string;
  shippingAddress: string;
  specialInstructions: string;
};

export default function PurchaseForm(props: PurchaseForm) {
  const { data } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(formData: FormData) {
    const submittedData = {
      ...formData,
      productName: data?.name,
      productPrice: data?.cost,
    };
    sendEmail(submittedData);
  }

  return (
    <form className={styles.formContain} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContain}>
        <label htmlFor="full name">Full Name</label>
        {errors.fullName && (
          <p className={styles.error}>Please check Fullname field</p>
        )}
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName", { required: true })}
        />
      </div>
      <div className={styles.inputContain}>
        <label htmlFor="email">Email</label>
        {errors.email && (
          <p className={styles.error}>Please check Email field</p>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
      </div>
      <div className={styles.inputContain}>
        <label htmlFor="shippingAddress">Shipping Address</label>
        {errors.shippingAddress && (
          <p className={styles.error}>Please check Shipping Address field</p>
        )}
        <input
          type="text"
          placeholder="Shipping Address"
          {...register("shippingAddress", { required: true })}
        />
      </div>
      <div className={styles.inputContain}>
        <label
          htmlFor="specialInstructions"
          className="mb-3 block text-base font-medium text-black"
        >
          Special Instructions
        </label>
        <textarea
          rows={4}
          placeholder="Special Instructions"
          {...register("specialInstructions")}
        ></textarea>
      </div>
      <div>
        <Button type={"submit"} text={"Submit"} />
      </div>
      <p>{data?.purchaseInstructions}</p>
    </form>
  );
}
