import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import { findUser } from "../hooks/useAuthStore";

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

export default function Login() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" }
  });

  const onSubmit = (vals) => {
    const match = findUser(vals.username, vals.password);
    if (match) {
      alert(`Welcome, ${match.name}! (Demo login)`);
    } else {
      alert("Invalid credentials or user not found.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="h1">Welcome back</h1>
        <p className="muted">Log in to continue.</p>

        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField control={control} name="username" label="Username" placeholder="your.username" autoComplete="username" />
          <PasswordField control={control} name="password" label="Password" placeholder="••••••••" />
          <button className="btn" disabled={isSubmitting} type="submit">Log in</button>
        </form>

        <div className="row">
          <span className="muted">New here?</span>
          <Link className="link" to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
