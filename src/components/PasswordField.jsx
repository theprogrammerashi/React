import React, { useState } from "react";
import { Controller } from "react-hook-form";

export default function PasswordField({ control, name, label, placeholder = "" }) {
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <div style={{ position: "relative" }}>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <>
              <input
                id={name}
                className="input"
                type={show ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
              {fieldState.error && <div className="error">{fieldState.error.message}</div>}
            </>
          )}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={{ position: "absolute", right: 10, top: 8, background: "transparent", color: "#9ca3af", border: 0, cursor: "pointer" }}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
