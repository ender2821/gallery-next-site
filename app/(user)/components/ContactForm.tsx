"use client";

import styles from "./forms.module.scss";

import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-contact-email";
import Button from "./Button";

export type FormData = {
  fullName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(formData: FormData) {
    sendEmail(formData);
  }

  return (
    <form className={styles.formContain} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContain}>
        <label htmlFor="full name">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName", { required: true })}
        />
      </div>
      <div className={styles.inputContain}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>
      <div className={styles.inputContain}>
        <label htmlFor="message">Message</label>
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
