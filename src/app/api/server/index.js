var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withErrorBoundaryProps, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback } from "react";
import { useButton } from "@react-aria/button";
import { SessionProvider } from "@hono/auth-js/react";
import { serializeError } from "serialize-error";
import { toast, Toaster } from "sonner";
import { create } from "zustand";
import { useIdleTimer } from "react-idle-timer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import fg from "fast-glob";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-ignore
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match == null ? void 0 : match[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry2]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry2.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry2]) => {
        const {
          width,
          height
        } = entry2.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);
const originalFetch = fetch;
const isBackend = () => typeof window === "undefined";
const safeStringify = (value) => JSON.stringify(value, (_k, v) => {
  if (v instanceof Date) return { __t: "Date", v: v.toISOString() };
  if (v instanceof Error)
    return { __t: "Error", v: { name: v.name, message: v.message, stack: v.stack } };
  return v;
});
const postToParent = (level, text, extra) => {
  try {
    if (isBackend() || !window.parent || window.parent === window) {
      ("level" in console ? console[level] : console.log)(text, extra);
      return;
    }
    window.parent.postMessage(
      {
        type: "sandbox:web:console-write",
        __viteConsole: true,
        level,
        text,
        args: [safeStringify(extra)]
      },
      "*"
    );
  } catch {
  }
};
const getURlFromArgs = (...args) => {
  const [urlArg] = args;
  let url;
  if (typeof urlArg === "string") {
    url = urlArg;
  } else if (urlArg instanceof Request) {
    url = urlArg.url;
  } else {
    url = `${urlArg.protocol}//${urlArg.host}${urlArg.pathname}`;
  }
  return url;
};
const isFirstPartyURL = (url) => {
  return url.startsWith("/integrations");
};
const fetchWithHeaders = async function fetchWithHeaders2(...args) {
  const [input, init] = args;
  const url = getURlFromArgs(input, init);
  const headers = {
    "x-createxyz-project-group-id": process.env.NEXT_PUBLIC_PROJECT_GROUP_ID
  };
  const isExternalFetch = !isFirstPartyURL(url);
  if (isExternalFetch || url.startsWith("/api")) {
    return originalFetch(input, init);
  }
  const finalHeaders = new Headers((init == null ? void 0 : init.headers) ?? {});
  for (const [key, value] of Object.entries(headers)) {
    if (value) {
      finalHeaders.set(key, value);
    }
  }
  if (input instanceof Request) {
    for (const [key, value] of Object.entries(headers)) {
      if (value) {
        input.headers.set(key, value);
      }
    }
  }
  try {
    const result = await originalFetch(
      `${isBackend() ? process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? "https://www.create.xyz" : ""}${input}`,
      {
        ...init,
        headers: finalHeaders
      }
    );
    if (!result.ok) {
      postToParent(
        "error",
        `Failed to load resource: the server responded with a status of ${result.status} (${result.statusText ?? ""})`,
        {
          url,
          status: result.status,
          statusText: result.statusText
        }
      );
    }
    return result;
  } catch (error) {
    postToParent("error", "Fetch error", {
      url,
      error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error
    });
    throw error;
  }
};
function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}
const useSandboxStore = create((set, get) => ({
  status: "idle",
  isGenerating: false,
  hasError: false,
  setStatus: (status) => set({
    status,
    isGenerating: status === "codegen-started" || status === "codegen-generating",
    hasError: status === "codegen-error"
  }),
  startCodeGen: () => get().setStatus("codegen-started"),
  setCodeGenGenerating: () => get().setStatus("codegen-generating"),
  completeCodeGen: () => get().setStatus("codegen-complete"),
  errorCodeGen: () => get().setStatus("codegen-error"),
  stopCodeGen: () => get().setStatus("codegen-stopped"),
  resetToIdle: () => get().setStatus("idle")
}));
function HotReloadIndicator() {
  const {
    status: sandboxStatus
  } = useSandboxStore();
  useEffect(() => {
    return;
  }, []);
  useEffect(() => {
    const toastStyle = {
      padding: "16px",
      background: "#18191B",
      border: "1px solid #2C2D2F",
      color: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "var(--width)",
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    };
    switch (sandboxStatus) {
      case "codegen-started":
      case "codegen-generating":
        toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          style: {
            ...toastStyle,
            padding: "10px"
          },
          renderId: "render-25f8a225",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: "https://www.create.xyz/images/project-revision-button-building-loading-state-white.gif",
            alt: "loading",
            className: "w-8 h-8",
            renderId: "render-68d4c65e",
            as: "img"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-f07e57c8",
            as: "span",
            children: "Updating"
          })]
        }), {
          id: "sandbox-codegen",
          duration: 3e3
        });
        break;
      case "codegen-complete":
        toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          style: toastStyle,
          renderId: "render-e4339253",
          as: "div",
          children: [/* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            height: "20",
            width: "20",
            children: [/* @__PURE__ */ jsx("title", {
              children: "Success"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
              clipRule: "evenodd",
              renderId: "render-e9e443e8",
              as: "path"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-fedb4108",
            as: "span",
            children: "Updated successfully"
          })]
        }), {
          id: "sandbox-codegen",
          duration: 3e3
        });
        break;
      case "codegen-error":
        toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          style: toastStyle,
          renderId: "render-4e19893f",
          as: "div",
          children: [/* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            height: "20",
            width: "20",
            children: [/* @__PURE__ */ jsx("title", {
              children: "Error"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              fillRule: "evenodd",
              d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
              clipRule: "evenodd",
              renderId: "render-edb8824d",
              as: "path"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-db8360c0",
            as: "span",
            children: "Update failed"
          })]
        }), {
          id: "sandbox-codegen",
          duration: 5e3
        });
        break;
    }
    return () => {
    };
  }, [sandboxStatus]);
  return null;
}
function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}
const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
function SharedErrorBoundary({
  isOpen,
  children
}) {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
    renderId: "render-3e8e9dea",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 max-w-md w-full mx-4 shadow-lg",
      renderId: "render-560d2720",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-start gap-3",
        renderId: "render-6d49cf8a",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex-shrink-0",
          renderId: "render-3282000a",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
            renderId: "render-86c9fd05",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-black text-[1.125rem] leading-none",
              renderId: "render-bbefc7cf",
              as: "span",
              children: "⚠"
            })
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col gap-2 flex-1",
          renderId: "render-13ed2d94",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-1",
            renderId: "render-1177f2f6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-light text-[#F2F2F2] text-sm",
              renderId: "render-18ee4999",
              as: "p",
              children: "App Error Detected"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-[#959697] text-sm font-light",
              renderId: "render-6f6446a4",
              as: "p",
              children: "It looks like an error occurred while trying to use your app."
            })]
          }), children]
        })]
      })
    })
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen: true
  });
});
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: showLogsButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:show-logs"
      }, "*");
    }, [])
  }, useRef(null));
  const {
    buttonProps: fixButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:fix",
        error: serializeError(error)
      }, "*");
      setIsOpen(false);
    }, [error]),
    isDisabled: !error
  }, useRef(null));
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
    }, [error])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen,
    children: isInIframe() ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex gap-2",
      renderId: "render-12e61170",
      as: "div",
      children: [!!error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#f9f9f9] hover:bg-[#dbdbdb] active:bg-[#c4c4c4] border-[#c4c4c4] text-[#18191B] text-sm px-[8px] py-[4px] cursor-pointer",
        type: "button",
        ...fixButtonProps,
        renderId: "render-146fd453",
        as: "button",
        children: "Try to fix"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px]",
        type: "button",
        ...showLogsButtonProps,
        renderId: "render-73e29c32",
        as: "button",
        children: "Show logs"
      })]
    }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px] w-fit",
      type: "button",
      ...copyButtonProps,
      renderId: "render-401ccb0c",
      as: "button",
      children: "Copy error"
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false,
      error: null
    });
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader: loader2
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader2()
  });
}
const ClientOnly = ({
  loader: loader2
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader: loader2
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const useCodeGen = () => {
  const {
    startCodeGen,
    setCodeGenGenerating,
    completeCodeGen,
    errorCodeGen,
    stopCodeGen
  } = useSandboxStore();
  useEffect(() => {
    const handleMessage = (event) => {
      const {
        type
      } = event.data;
      switch (type) {
        case "sandbox:web:codegen:started":
          startCodeGen();
          break;
        case "sandbox:web:codegen:generating":
          setCodeGenGenerating();
          break;
        case "sandbox:web:codegen:complete":
          completeCodeGen();
          break;
        case "sandbox:web:codegen:error":
          errorCodeGen();
          break;
        case "sandbox:web:codegen:stopped":
          stopCodeGen();
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [startCodeGen, setCodeGenGenerating, completeCodeGen, errorCodeGen, stopCodeGen]);
};
const useRefresh = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:refresh:request") {
        setTimeout(() => {
          window.location.reload();
        }, 1e3);
        window.parent.postMessage({
          type: "sandbox:web:refresh:complete"
        }, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useCodeGen();
  useRefresh();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location == null ? void 0 : location.pathname;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), /* @__PURE__ */ jsx(LoadFonts, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(HotReloadIndicator, {}), /* @__PURE__ */ jsx(Toaster, {
        position: "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClientOnly,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  useHmrConnection
}, Symbol.toStringTag, { value: "Module" }));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      // 5 minutes
      cacheTime: 1e3 * 60 * 30,
      // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children
  });
}
const cars = [{
  name: "Vezel Z Play",
  image: "https://th.bing.com/th/id/OIP.5edVNHfu4gzopNPJZTTPQgHaDt?w=307&h=174&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  specs: ["Gray exterior", "Two tone interior", "Moon roof", "10 speaker sound system", "Apple CarPlay", "Power boot", "4-way camera", "Fully loaded"]
}, {
  name: "Toyota Raize Z 2025",
  image: "https://www.harneymotorsltd.com/wp-content/uploads/2022/04/Toyota-Raize-White.jpeg",
  specs: ["2 Tone White & Black top", "1200cc Hybrid", "YOM 2025", "Mileage brand new", "Dual Multi-Function", "Black & Red two-tone interior", "360° Camera (4-WAY)", "LED Digital Speedometer", "Multi Information Display", "17” Original Alloy wheels", "ABS, HAC, VSC, TPWS", "Adaptive Cruise Control", "Fog lights", "Rear Wiper", "Retractable Winker Mirrors"]
}, {
  name: "Vezel 2024 Z Premium",
  image: "https://luxuryx.lk/_upload/2025-06/228-1748796328.webp",
  specs: ["Mileage – 3000 km", "Black exterior", "Black interior", "Apple CarPlay", "10 speaker sound system", "4-way camera", "Wireless charger", "Power boot"]
}, {
  name: "Toyota Yaris X 2024",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH7wxNZJXvuwKTRQEFsAE2dGAZf3SnpmW4Q&s",
  specs: ["Push Start", "Safety Brake System", "Parking sensor", "Rear Wiper", "Charging Port", "Power Shutter", "Power Mirror", "Auto Headlights", "SOS Emergency System", "Eco Mode", "Genuine Floor Mats", "Genuine Door Visors", "Multifunction Steering", "Touch screen player", "Traction Control", "1000CC", "Reverse Camera", "White Exterior", "Black Interior", "0 KM Mileage"]
}, {
  name: "Daihatsu Mira 2024",
  image: "https://th.bing.com/th/id/OIP.3OQoK9ldOaT9TKijwQ_xjwHaDg?w=311&h=165&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  specs: ["Unregistered", "Pearl white colour", "X limited Grade", "Auto head lamp", "Lane departure warning", "LED head lamps", "Auto brake sensors", "ABS", "Airbag", "Traction control", "Power shutters", "Power mirrors"]
}];
function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-black text-white",
    renderId: "render-1d47f63d",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black/80 backdrop-blur-sm",
      renderId: "render-0412c686",
      as: "header",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto flex items-center justify-between",
        renderId: "render-f426271c",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3",
          renderId: "render-d47a4cf8",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-[#00FF00]",
            renderId: "render-6d5902de",
            as: "div",
            children: /* @__PURE__ */ jsx("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              xmlnsXlink: "http://www.w3.org/1999/xlink",
              width: "100",
              height: "40",
              viewBox: "0 0 441 184",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                xlinkHref: "data:image/png;base64,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",
                x: "0",
                y: "0",
                width: "441",
                height: "184",
                renderId: "render-fd25cc84",
                as: "image"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#00FF00] tracking-wider",
            renderId: "render-ed6bc3d7",
            as: "h1",
            children: "LUXRO AUTOHAUS"
          })]
        })
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative min-h-screen flex items-center justify-center px-8 py-20",
      renderId: "render-3f7792f2",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0 z-0",
        style: {
          backgroundImage: "url(https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&h=900&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)"
        },
        renderId: "render-2f41c106",
        as: "div"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center",
        renderId: "render-cfe88876",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-215eef44",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-6xl md:text-7xl lg:text-8xl font-black text-[#00FF00] leading-tight mb-8",
            renderId: "render-8919d4ef",
            as: "h2",
            children: ["WELCOME TO", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-d65cb7ed",
              as: "br"
            }), "LUXRO. YOUR", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-789b23a2",
              as: "br"
            }), "LUXURIOUS RIDE"]
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/90 backdrop-blur-md p-8 rounded-2xl border border-[#00FF00]/20",
          renderId: "render-cb5ea881",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "mb-6",
            renderId: "render-1cf4ec78",
            as: "div",
            children: /* @__PURE__ */ jsx("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              xmlnsXlink: "http://www.w3.org/1999/xlink",
              width: "250",
              height: "85",
              viewBox: "0 0 441 184",
              className: "mx-auto",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                xlinkHref: "data:image/png;base64,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",
                x: "0",
                y: "0",
                width: "441",
                height: "184",
                renderId: "render-f8e88ea3",
                as: "image"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-center mb-2",
            renderId: "render-29c94cbe",
            as: "h3",
            children: "LUXRO AUTOHAUS"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-gray-400 text-center mb-6",
            renderId: "render-aab70d7c",
            as: "p",
            children: "Welcome to LUXRO. Car Luxurious ride"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full bg-[#00FF00] hover:bg-[#00dd00] text-black font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105",
            renderId: "render-fc2b7a3f",
            as: "button",
            children: ["Request a quote", /* @__PURE__ */ jsx(ArrowRight, {
              size: 20
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "py-20 px-8 bg-gradient-to-b from-[#0a0a0a] to-black",
      renderId: "render-3f1efa48",
      as: "section",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto space-y-16",
        renderId: "render-8e47fac6",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-65708228",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-5xl md:text-6xl font-black text-[#00FF00] mb-6",
            renderId: "render-dba9117a",
            as: "h2",
            children: "OUR VISION"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-gray-300 text-xl leading-relaxed max-w-4xl",
            renderId: "render-e18c0864",
            as: "p",
            children: "“To become Sri Lanka’s leading and most trusted automotive retailer by delivering unmatched quality, earning customer loyalty, and setting new standards in the vehicle sales industry.”"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid md:grid-cols-2 gap-8",
          renderId: "render-ea134e66",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "relative h-[400px] rounded-2xl overflow-hidden group",
            renderId: "render-1ba8f50a",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              src: "https://www.mercedes-benz.com/content/dam/brandhub/assets/exclusive/classic-magazine/magazine0122-tropical-festival/17-mercedes-benz-magazine-sri-lanka-5120x2880.jpg/_jcr_content/renditions/image-crop-default.jpeg/1730311479545.jpg?im=Resize=(820);Crop,rect=(0,0,820,461)",
              alt: "Vintage car",
              className: "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110",
              renderId: "render-6a5ed80c",
              as: "img"
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "relative h-[400px] rounded-2xl overflow-hidden group",
            renderId: "render-155a5f92",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              src: "https://sonofthemorninglight.wordpress.com/wp-content/uploads/2020/12/screen-shot-2020-12-08-at-2.28.41-pm.jpg?w=1440",
              alt: "Car on scenic road",
              className: "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110",
              renderId: "render-6c17c468",
              as: "img"
            })
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-8b28749f",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-5xl md:text-6xl font-black text-[#00FF00] mb-6",
            renderId: "render-0ca52ea4",
            as: "h2",
            children: "OUR MISSION"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-gray-300 text-xl leading-relaxed max-w-4xl",
            renderId: "render-7240b47d",
            as: "p",
            children: "“At Luxro Autohaus (PVT) LTD, our mission is to uphold the highest standards of vehicle quality, prioritize customer satisfaction above profit, and establish ourselves as the biggest and most reliable car sales hub in Kaduwela. We strive to build lasting relationships, offer transparent services, and contribute to shaping Sri Lanka’s automotive future.”"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "py-20 px-8 bg-gradient-to-b from-black to-[#0a0a0a]",
      renderId: "render-f4f408f0",
      as: "section",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto",
        renderId: "render-89ce8eb7",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-5xl md:text-6xl font-black text-[#00FF00] mb-12",
          renderId: "render-c708d7c1",
          as: "h2",
          children: "CURRENT OFFERS"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "grid md:grid-cols-3 gap-10",
          renderId: "render-ef77b3b1",
          as: "div",
          children: cars.map((car, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => setSelectedCar(car),
            className: "cursor-pointer bg-gradient-to-br from-[#1a1a1a] to-[#080808] p-4 rounded-xl border border-[#00FF00]/20 hover:border-[#00FF00] transition transform hover:scale-105",
            renderId: "render-611cc84e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              src: car.image,
              alt: car.name,
              className: "w-full h-48 object-cover rounded-lg mb-4",
              renderId: "render-41112437",
              as: "img"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-[#00FF00] font-bold text-xl",
              renderId: "render-5f269ee3",
              as: "h3",
              children: car.name
            })]
          }, index))
        })]
      }), selectedCar && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50",
        renderId: "render-0a3ce39c",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-[#111] border border-[#00FF00]/30 p-8 rounded-2xl w-[90%] max-w-2xl relative max-h-[90vh] overflow-y-auto",
          renderId: "render-68d82574",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "absolute top-4 right-4 text-[#00FF00] text-xl",
            onClick: () => setSelectedCar(null),
            renderId: "render-45f78d5b",
            as: "button",
            children: "✕"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: selectedCar.image,
            alt: selectedCar.name,
            className: "w-full h-56 object-cover rounded-lg mb-6",
            renderId: "render-7ff0310d",
            as: "img"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl font-bold text-[#00FF00] mb-4",
            renderId: "render-254ce3ca",
            as: "h2",
            children: selectedCar.name
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "space-y-2 text-gray-300",
            renderId: "render-e76ccc03",
            as: "ul",
            children: selectedCar.specs.map((item, idx) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-337f1c10",
              as: "li",
              children: ["• ", item]
            }, idx))
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "py-20 px-8 bg-black",
      renderId: "render-bb86681e",
      as: "section",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto",
        renderId: "render-19941ca5",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-5xl md:text-6xl font-black text-[#00FF00] mb-12",
          renderId: "render-f4b008e8",
          as: "h2",
          children: "CLIENT STORIES"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid md:grid-cols-3 gap-8",
          renderId: "render-dbbb96d8",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-br from-[#1a3a1a]/40 to-[#0a1a0a]/40 p-8 rounded-2xl border border-[#00FF00]/20",
            renderId: "render-b052ca27",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#00FF00] mb-2",
              renderId: "render-e6b4893f",
              as: "h3",
              children: ["Gavesh", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-cbd6454c",
                as: "br"
              }), "Athulathmudali"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-gray-300 leading-relaxed",
              renderId: "render-6d3f119b",
              as: "p",
              children: '"Amazing experience at Luxro Autohaus! The staff was friendly, knowledgeable, and helped me find the perfect car. Smooth, no-pressure process. Highly recommend!"'
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-br from-[#1a3a1a]/40 to-[#0a1a0a]/40 p-8 rounded-2xl border border-[#00FF00]/20",
            renderId: "render-522fa89a",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#00FF00] mb-2",
              renderId: "render-ee1945d8",
              as: "h3",
              children: ["Shakya", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-6c6d17e9",
                as: "br"
              }), "Karunarathne"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-gray-300 leading-relaxed",
              renderId: "render-049d2df5",
              as: "p",
              children: '"Luxro Autohaus made buying my car easy and stress-free. The team was super helpful, and the financing options were great. Highly satisfied with my purchase!"'
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-gradient-to-br from-[#1a3a1a]/40 to-[#0a1a0a]/40 p-8 rounded-2xl border border-[#00FF00]/20",
            renderId: "render-9dcfba3e",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#00FF00] mb-2",
              renderId: "render-80cdee38",
              as: "h3",
              children: ["Nalaka", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-c559cbfc",
                as: "br"
              }), "Watagamuwa"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-gray-300 leading-relaxed",
              renderId: "render-ff29ddb9",
              as: "p",
              children: `"Excellent service and a great selection of cars. The team was professional and made the whole experience smooth. I'm thrilled with my new car!"`
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "py-20 px-8 bg-gradient-to-b from-black to-[#0a0a0a] relative",
      renderId: "render-6476a6bc",
      as: "section",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0 z-0",
        style: {
          backgroundImage: "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=900&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2)"
        },
        renderId: "render-45b08405",
        as: "div"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "relative z-10 max-w-7xl mx-auto",
        renderId: "render-aac5a5f6",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-5xl md:text-6xl font-black text-[#00FF00] mb-12",
          renderId: "render-6712edc1",
          as: "h2",
          children: "GET IN TOUCH"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid md:grid-cols-2 gap-12",
          renderId: "render-511dd93c",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-8",
            renderId: "render-d9104534",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-61f3cdeb",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl font-bold text-[#00FF00] mb-3",
                renderId: "render-ed807065",
                as: "h3",
                children: "Mailing Address"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-gray-300",
                renderId: "render-ea466966",
                as: "p",
                children: ["No.511/3 awissawella road,", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-9f361ed9",
                  as: "br"
                }), "Kaduwela"]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-22740145",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl font-bold text-[#00FF00] mb-3",
                renderId: "render-5d516761",
                as: "h3",
                children: "Phone Number"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-gray-300",
                renderId: "render-88752a2d",
                as: "p",
                children: ["+94 71 066 6444", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-ca0684b9",
                  as: "br"
                }), "+94 71 766 6444"]
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-8",
            renderId: "render-31b8eddf",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-8b690614",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl font-bold text-[#00FF00] mb-3",
                renderId: "render-240dd5a2",
                as: "h3",
                children: "Email Address"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-gray-300",
                renderId: "render-9b7b18f7",
                as: "p",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "mailto:info@luxro-autohaus.lk",
                  className: "hover:underline",
                  renderId: "render-c16c8c77",
                  as: "a",
                  children: "info@luxro-autohaus.lk"
                })
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-8c5976ef",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-2xl font-bold text-[#00FF00] mb-3",
                renderId: "render-5acabe4a",
                as: "h3",
                children: "Socials"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-4 text-gray-300",
                renderId: "render-86055623",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "https://www.facebook.com/share/1FTKatHEeD/?mibextid=LQQJ4d",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-[#00FF00] transition text-2xl",
                  renderId: "render-bff95625",
                  as: "a",
                  children: /* @__PURE__ */ jsx(FaFacebookF, {})
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "https://www.tiktok.com/@luxro_autohaus?_r=1&_t=ZS-91XEYe9h4ok",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "hover:text-[#00FF00] transition text-2xl",
                  renderId: "render-1e78386f",
                  as: "a",
                  children: /* @__PURE__ */ jsx(FaTiktok, {})
                })]
              })]
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "py-12 px-8 bg-black border-t border-[#00FF00]/20",
      renderId: "render-c5ba340c",
      as: "footer",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto text-center",
        renderId: "render-7f8e28dc",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mb-4",
          renderId: "render-3fd04577",
          as: "div",
          children: /* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            width: "250",
            height: "85",
            viewBox: "0 0 441 184",
            className: "mx-auto",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              xlinkHref: "data:image/png;base64,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",
              x: "0",
              y: "0",
              width: "441",
              height: "184",
              renderId: "render-f184d564",
              as: "image"
            })
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-bold mb-2",
          renderId: "render-c6e5479e",
          as: "h3",
          children: "LUXRO AUTOHAUS"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-[#00FF00]",
          renderId: "render-779bfccf",
          as: "p",
          children: "Welcome to LUXRO. your luxurious ride"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400 mt-8",
          renderId: "render-5c073b9a",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-gray-400",
            renderId: "render-ee7e9bb8",
            as: "p",
            children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " LUXRO AUTOHAUS"]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/terms",
            className: "hover:text-[#00FF00] transition-all",
            renderId: "render-7ead8bf3",
            as: "a",
            children: "Terms & Conditions"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            href: "/privacy",
            className: "hover:text-[#00FF00] transition-all",
            renderId: "render-bf8fc2b4",
            as: "a",
            children: "Privacy Notice"
          })]
        })]
      })
    })]
  });
}
const page$2 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */ jsx(RootLayout, {
    children: /* @__PURE__ */ jsx(HomePage, {
      ...props
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: "Module" }));
function PrivacyPage() {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen bg-black text-gray-300 p-8 animate-fadeIn",
    renderId: "render-75e150bd",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto",
      renderId: "render-1ff013ac",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-4xl md:text-5xl font-black text-[#00FF00] mb-6",
        renderId: "render-c71e3a2b",
        as: "h1",
        children: "Privacy Notice"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-cf67f83d",
        as: "p",
        children: "Luxro Autohaus is committed to protecting your privacy and personal information. This notice explains what data we collect and how we use it."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-25e626c2",
        as: "h2",
        children: "Information We Collect"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-a0575d19",
        as: "p",
        children: "We may collect personal information such as contact details, messages, purchasing interests, and browsing behavior when interacting with our website."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-a682f140",
        as: "h2",
        children: "How Your Data Is Used"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-0a61ff21",
        as: "p",
        children: "Your information is used to improve customer service, manage inquiries, provide support, and improve the user experience. We do not sell or trade personal data to third parties."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-11548727",
        as: "h2",
        children: "Data Protection"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-676f205e",
        as: "p",
        children: "We implement strict protection protocols to ensure your data is secure and protected from misuse, unauthorized access, or alteration."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-cba0920b",
        as: "h2",
        children: "Policy Updates"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-10",
        renderId: "render-00aeb3d9",
        as: "p",
        children: "This Privacy Notice may be updated occasionally. Continued use of our services indicates acceptance of the latest version."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        href: "/",
        className: "inline-block mt-6 bg-[#00FF00] text-black font-bold py-3 px-6 rounded-full hover:bg-[#00dd00] transition-all",
        renderId: "render-2c409401",
        as: "a",
        children: "← Back to Home"
      })]
    })
  });
}
const page$1 = UNSAFE_withComponentProps(function WrappedPage2(props) {
  return /* @__PURE__ */ jsx(RootLayout, {
    children: /* @__PURE__ */ jsx(PrivacyPage, {
      ...props
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: "Module" }));
function TermsPage() {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen bg-black text-gray-300 p-8 animate-fadeIn",
    renderId: "render-64e2428a",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto",
      renderId: "render-e4128b62",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-4xl md:text-5xl font-black text-[#00FF00] mb-6",
        renderId: "render-8b9c3f93",
        as: "h1",
        children: "Terms & Conditions"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-55509af2",
        as: "p",
        children: "Welcome to Luxro Autohaus. By accessing or using our website or services, you agree to the following terms. Please read them carefully."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-d6549696",
        as: "h2",
        children: "Vehicle Information"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-d4d75bd2",
        as: "p",
        children: "All vehicle specifications provided are based on available information from manufacturers and sources at the time of listing. Some details may change due to upgrades or market variations."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-0ed7a7c7",
        as: "h2",
        children: "Pricing & Payments"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-75da5533",
        as: "p",
        children: "All advertised prices are subject to change without notice. Deposits may be non-refundable depending on circumstances."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-70556bc3",
        as: "h2",
        children: "Liability"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-4",
        renderId: "render-b7de31e7",
        as: "p",
        children: "Luxro Autohaus is not responsible for damages, loss, or accidents caused by improper use of vehicles, delayed service, third-party issues, or natural causes."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-2xl font-bold text-[#00FF00] mt-8 mb-2",
        renderId: "render-6d3cc2fa",
        as: "h2",
        children: "Amendments"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-10",
        renderId: "render-2a79ca09",
        as: "p",
        children: "These Terms & Conditions may be updated at any time. Continued use of our website means acceptance of revised terms."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        href: "/",
        className: "inline-block mt-6 bg-[#00FF00] text-black font-bold py-3 px-6 rounded-full hover:bg-[#00dd00] transition-all",
        renderId: "render-9b8b6220",
        as: "a",
        children: "← Back to Home"
      })]
    })
  });
}
const page = UNSAFE_withComponentProps(function WrappedPage3(props) {
  return /* @__PURE__ */ jsx(RootLayout, {
    children: /* @__PURE__ */ jsx(TermsPage, {
      ...props
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map((match) => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  var _a;
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = (event) => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map((page2) => ({
    path: page2.path,
    url: page2.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = (value) => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-5b366ad7",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-3af9b97c",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-bce18a33",
        as: "button",
        children: /* @__PURE__ */ jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-d693289f",
            as: "path"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-3f76c80e",
            as: "path"
          })]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-40564c72",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-76dd32bf",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-691f4b5a",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-6461f300",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-9c433877",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-4085136d",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-71e4a495",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-1b5af276",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-47cefaac",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-6db05581",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-0b38c040",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-b932201c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-c7b1acf9",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-2a170373",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-c26bdb7b",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-db5581b4",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-150e0e84",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-041149bf",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-da2d86ee",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-72f1c319",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-34503ea7",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-c258ad92",
            as: "p",
            children: "PAGES"
          }), (_a = siteMap.webPages) == null ? void 0 : _a.map((route) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-a92b720f",
            as: "button",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-475bb3a0",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-b15f9cdd",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-804bd012",
        as: "div",
        children: existingRoutes.map((route) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-875b17ce",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-86c8f522",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-4974246c",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-90758b13",
                as: "button"
              })
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-f13d8d1a",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BEuJpOUU.js", "imports": ["/assets/chunk-4WY6JWTD-C-0XVRoR.js", "/assets/index-8iVwUFAJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-x8Y5jbhS.js", "imports": ["/assets/chunk-4WY6JWTD-C-0XVRoR.js", "/assets/index-8iVwUFAJ.js", "/assets/PolymorphicComponent-C1fwtMkO.js"], "css": ["/assets/root-CUd5fJuH.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "page": { "id": "page", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-DieZlcKe.js", "imports": ["/assets/PolymorphicComponent-C1fwtMkO.js", "/assets/chunk-4WY6JWTD-C-0XVRoR.js", "/assets/layout-BwakN9mY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "privacy/page": { "id": "privacy/page", "parentId": "root", "path": "privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-SbxiIPaZ.js", "imports": ["/assets/PolymorphicComponent-C1fwtMkO.js", "/assets/chunk-4WY6JWTD-C-0XVRoR.js", "/assets/layout-BwakN9mY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "terms/page": { "id": "terms/page", "parentId": "root", "path": "terms", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-BieyODbh.js", "imports": ["/assets/PolymorphicComponent-C1fwtMkO.js", "/assets/chunk-4WY6JWTD-C-0XVRoR.js", "/assets/layout-BwakN9mY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "__create/not-found": { "id": "__create/not-found", "parentId": "root", "path": "*?", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/not-found-D-osMsMX.js", "imports": ["/assets/PolymorphicComponent-C1fwtMkO.js", "/assets/chunk-4WY6JWTD-C-0XVRoR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-69c628c0.js", "version": "69c628c0", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "page": {
    id: "page",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "privacy/page": {
    id: "privacy/page",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "terms/page": {
    id: "terms/page",
    parentId: "root",
    path: "terms",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "__create/not-found": {
    id: "__create/not-found",
    parentId: "root",
    path: "*?",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
