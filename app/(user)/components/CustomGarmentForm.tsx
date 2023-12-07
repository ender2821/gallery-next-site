"use client";

import styles from "./forms.module.scss";

import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-custom-garment-email";
import Button from "./Button";

export type FormData = {
  fullName: string;
  email: string;
  message: string;
};

export default function CustomGarmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(formData: FormData) {
    sendEmail(formData);
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
        <label htmlFor="message">Message</label>
        {errors.message && (
          <p className={styles.error}>Please check Message field</p>
        )}
        <textarea
          rows={4}
          placeholder="Message"
          {...register("message", { required: true })}
        />
      </div>
      <div>
        <Button type={"submit"} text={"Submit"} />
      </div>
    </form>
  );
}
