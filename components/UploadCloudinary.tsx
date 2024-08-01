"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  link?: string;
  setLink: (link: string) => void;
  divStyle?: string;
}

const UploadCloudinary = ({ setLink, divStyle, link }: Props) => {
  return (
    <>
      <div className="hidden dark:block">
        <CldUploadWidget
          options={{
            sources: ["local", "url"],
            multiple: false,
            cropping: true,
            styles: {
              palette: {
                window: "#111111",
                sourceBg: "#111111",
                windowBorder: "#e11d47",
                tabIcon: "#ffffff",
                inactiveTabIcon: "#555a5f",
                menuIcons: "#555a5f",
                link: "#e11d47",
                action: "#339933",
                inProgress: "#e11d47",
                complete: "#339933",
                error: "#cc0000",
                textDark: "#000000",
                textLight: "#fcfffd",
              },
              fonts: {
                default: null,
                "sans-serif": {
                  url: null,
                  active: true,
                },
              },
            },
          }}
          uploadPreset="oekh1dfb"
          onUpload={(result) => {
            console.log({ result });
            if (result.event !== "success") return;
            const info = result.info as CloudinaryResult;
            if (info.url) {
              setLink(info.url);
            }
          }}
        >
          {({ open }) => {
            if (!open) return <></>;
            return (
              <button
                className="w-full h-full"
                onClick={() => {
                  open();
                }}
              >
                <div className={divStyle}>
                  <img
                    className="w-full h-full object-cover hover:opacity-95"
                    src={
                      link ||
                      "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
                    }
                  />
                </div>
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className="dark:hidden h-full">
        <CldUploadWidget
          options={{
            sources: ["local", "url"],
            multiple: false,
            cropping: true,
            styles: {
              palette: {
                window: "#fff",
                sourceBg: "f4f4f5",
                windowBorder: "#e11d47",
                tabIcon: "#000000",
                inactiveTabIcon: "#555a5f",
                menuIcons: "#555a5f",
                link: "#e11d47",
                action: "#339933",
                inProgress: "#e11d47",
                complete: "#339933",
                error: "#cc0000",
                textDark: "#000000",
                textLight: "#fcfffd",
              },
              fonts: {
                default: null,
                "sans-serif": {
                  url: null,
                  active: true,
                },
              },
            },
          }}
          uploadPreset="oekh1dfb"
          onUpload={(result) => {
            console.log({ result });
            if (result.event !== "success") return;
            const info = result.info as CloudinaryResult;
            if (info.url) {
              setLink(info.url);
            }
          }}
        >
          {({ open }) => {
            if (!open) return <></>;
            return (
              <button
                className="w-full h-full"
                onClick={() => {
                  open();
                }}
              >
                <div className={divStyle}>
                  <img
                    className="w-full h-full object-cover hover:opacity-95"
                    src={
                      link ||
                      "https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1"
                    }
                  />
                </div>
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </>
  );
};

export default UploadCloudinary;
