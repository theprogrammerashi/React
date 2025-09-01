import React from "react";
import { Controller } from "react-hook-form";

export default function FormField({ control, name, label, type = "text", placeholder = "", autoComplete = "off" }) {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <input
              id={name}
              className="input"
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
            {fieldState.error && <div className="error">{fieldState.error.message}</div>}
          </>
        )}
      />
    </div>
  );
}
