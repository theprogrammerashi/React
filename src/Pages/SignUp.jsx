import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import { saveUser } from "../hooks/useAuthStore";

const usernameRegex = /^[A-Za-z0-9._\-@!#$%^&*]+$/;
const nameRegex = /^[A-Za-z ]+$/;
const phoneRegex = /^\+\d{1,3}\s?\d{6,14}$/;

const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required").regex(nameRegex, "Only alphabets and spaces allowed"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(usernameRegex, "Use letters, numbers or . _ - @ ! # $ % ^ & *"),
  email: z.string().email("Enter a valid email").refine(v => v.toLowerCase().endsWith("@gmail.com"), "Email must be a Google (gmail.com) address"),
  phone: z.string().regex(phoneRegex, "Use +<countrycode> <number>, e.g. +91 9876543210"),
  password: z.string().min(6, "Password must be at least 6 characters").regex(usernameRegex, "Use letters, numbers or . _ - @ ! # $ % ^ & *"),
  confirm: z.string().min(1, "Please confirm your password")
}).refine(data => data.password === data.confirm, { path: ["confirm"], message: "Passwords do not match" }).refine(data => data.password !== data.username, { path: ["password"], message: "Password cannot be the same as username" });

export default function SignUp() {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: "", username: "", email: "", phone: "", password: "", confirm: "" }
  });

  const onSubmit = (vals) => {
    try {
      saveUser({ name: vals.name, username: vals.username, email: vals.email, phone: vals.phone, password: vals.password });
      navigate("/login", { replace: true });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="h1">Create your account</h1>
        <p className="muted">Join us in a few seconds.</p>

        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField control={control} name="name" label="Name" placeholder="Jane Doe" autoComplete="name" />
          <FormField control={control} name="username" label="Username" placeholder="jane.doe_91" autoComplete="username" />
          <FormField control={control} name="email" label="Email" placeholder="you@gmail.com" autoComplete="email" />
          <FormField control={control} name="phone" label="Phone" placeholder="+91 9876543210" autoComplete="tel" />
          <PasswordField control={control} name="password" label="Password" placeholder="••••••••" />
          <PasswordField control={control} name="confirm" label="Confirm password" placeholder="••••••••" />

          <button className="btn" disabled={isSubmitting} type="submit">Sign up</button>
        </form>

        <div className="row">
          <span className="muted">Already have an account?</span>
          <button className="link" onClick={() => navigate("/login")}>Log in</button>
        </div>
      </div>
    </div>
  );
}

