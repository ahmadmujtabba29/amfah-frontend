"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiError, login } from "@/lib/api";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldIcon,
} from "@/components/icons";

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
});

type LoginValues = Yup.InferType<typeof loginSchema>;

export function LoginForm() {
  const formId = useId();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setFormError(null);

      try {
        await login({
          email: values.email.trim(),
          password: values.password,
        });

        router.push("/dashboard");
        router.refresh();
      } catch (error) {
        if (error instanceof ApiError) {
          setFormError(error.message);
          return;
        }

        setFormError("Unable to sign in. Please try again.");
      }
    },
  });

  return (
    <section className="flex h-full w-full max-w-full items-center justify-center">
      <div className="w-full max-w-[420px] rounded-2xl border border-amfah-border/80 bg-amfah-card/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-8 lg:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Sign In</h2>
          <p className="mt-2 text-sm text-amfah-muted">
            Access your AMFAH Enterprise Console
          </p>
          <div className="mx-auto mt-4 h-px w-14 bg-amfah-gold" />
        </div>

        <form className="space-y-5" onSubmit={formik.handleSubmit} noValidate>
          <Input
            id={`${formId}-email`}
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
            leftIcon={<MailIcon className="h-4 w-4" />}
          />

          <Input
            id={`${formId}-password`}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
            leftIcon={<LockIcon className="h-4 w-4" />}
            rightIcon={
              showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )
            }
            rightIconLabel={showPassword ? "Hide password" : "Show password"}
            onRightIconClick={() => setShowPassword((current) => !current)}
          />

          {formError ? (
            <p className="text-center text-xs text-red-400" role="alert">
              {formError}
            </p>
          ) : null}

          <Button type="submit" fullWidth disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "SIGNING IN..." : "SIGN IN"}
          </Button>
        </form>

        <div className="mt-8 border-t border-amfah-border pt-5">
          <p className="flex items-center justify-center gap-2 text-xs text-amfah-muted">
            <ShieldIcon className="h-3.5 w-3.5 text-amfah-gold" />
            Secure Access. Enterprise Grade Protection.
          </p>
        </div>
      </div>
    </section>
  );
}
