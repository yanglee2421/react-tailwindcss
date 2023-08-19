// Redux Imports
import { sliceLogin, useAppDispatch } from "@/redux";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemEmail, ItemPassword, ItemIsRemember } from "./form-items";

// React Imports
import React, { useEffect, useState } from "react";

// Utils Imports
import { toBase64 } from "@/utils";

// API Imports
import { axiosMock } from "@/api/axios-mock";

export function Component() {
  const dispatch = useAppDispatch();

  const schema = getSchema();
  const formReturn = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  // Submit & reset
  const handleReset = () => formReturn.reset();
  const handleSubmit = formReturn.handleSubmit((data) => {
    console.log(data);
    dispatch(sliceLogin.actions.islogged(true));
  });

  // File Change
  const handleChange: HandleChange = async (evt) => {
    const { files } = evt.target;
    if (!files) return;

    const file = files[0];
    const data = await toBase64(file);
    console.log(data);
  };

  // const api_key = "7f60282345fe46e7dc8a811478e4cbba";
  const api_key = "7f60282345fe46e7dc8a811478e4cbba";
  const client_secret = "394c4c6a9ca298d413ac24f3a4e922a0";
  const scopes = "read_products,write_products";
  // const scopes =
  //   "read_products,write_products,read_inventory,write_inventory,read_content,write_content";
  // const redirect_uri = "http://localhost:5173/base/login";
  const redirect_uri =
    "https://api-stg.warp-driven.com/connection/shopify/auth/callback";
  const nonce = "";
  const option = "";
  // const aHref = `https://woolworlds.myshopify.com/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${option}`;
  const aHref = `https://admin.shopify.com/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${option}`;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const code = urlSearchParams.get("code");

  if (code) {
    const searchParams = new URLSearchParams();
    searchParams.set("code", code || "");
    searchParams.set("client_id", api_key);
    searchParams.set("client_secret", client_secret);

    // fetch("https://woolworlds.myshopify.com/admin/oauth/access_token", {
    //   method: "POST",
    //   body: searchParams,
    // })
    //   .then((res) => (res.ok ? res.json() : res.statusText))
    //   .then((data) => {
    //     console.log(data);
    //   });
  }

  const [joke, setJoke] = useState("");
  useEffect(() => {
    setJoke("");
    const controller = new AbortController();
    const { signal } = controller;
    axiosMock({
      signal,
      url: "http://localhost:3002/redirect",
      onDownloadProgress(progressEvent) {
        setJoke(progressEvent.event.target.responseText);
      },
    });

    // void (async () => {
    //   const res = await fetch("http://localhost:3002/redirect", { signal });
    //   const reader = res.body?.getReader();
    //   while (reader) {
    //     const { done, value } = await reader.read();
    //     const textDecoder = new TextDecoder();
    //     const text = textDecoder.decode(value);
    //     // console.log(text);
    //     setJoke((prev) => (prev += text));
    //     if (done) break;
    //   }
    // })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="h-100">
      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
        <FormProvider {...formReturn}>
          <ItemEmail name={"email"}></ItemEmail>
          <ItemPassword name={"passwd"}></ItemPassword>
          <ItemIsRemember name={"isRemember"}></ItemIsRemember>
        </FormProvider>
        <div>
          <input type="file" onChange={handleChange} />
        </div>
        <div>
          <a href={aHref}>shopify oauth</a>
        </div>
        <div>
          <button type="submit">login</button>
          <button type="reset">reset</button>
        </div>
      </form>
      <p>{joke}</p>
    </div>
  );
}
type HandleChange = React.ChangeEventHandler<HTMLInputElement>;

// Validate fields rules
function getSchema() {
  return yup.object().shape({
    email: yup
      .string()
      .required()
      .email()
      .max(30)
      .test((v, { createError }) => {
        if (v === "yanglee2421@gmail.com") return true;
        return createError({ message: "Email不正确" });
      }),
    passwd: yup
      .string()
      .required()
      .max(16)
      .test((v, { createError }) => {
        if (v === "admin") return true;
        return createError({ message: "密码不正确" });
      }),
    isRemember: yup.boolean().test((v, { createError }) => {
      if (v) return true;
      return createError({ message: "不记住你登nm" });
    }),
  });
}
